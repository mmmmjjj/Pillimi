package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.UploadReq;
import com.pillimi.backend.common.exception.InvalidException;
import com.pillimi.backend.api.response.*;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.AlarmProtector;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AlarmServiceImpl implements AlarmService {

    private final AlarmProtegeRepository alarmProtegeRepository;

    private final AlarmProtectorRepository alarmProtectorRepository;

    private final MemberMedicineRepository memberMedicineRepository;

    private final FamilyRepository familyRepository;

    private final S3Uploader s3Uploader;

    private final FirebaseMessageService firebaseMessageService;

    /*
    id로 알림 조회
     */
    @Override
    public Optional<AlarmProtege> getAlarmProtegeById(Long alarmSeq) {
        return alarmProtegeRepository.findById(alarmSeq);
    }

    /*
    피보호자 알림 res 조회
     */
    @Override
    public AlarmProtegeRes getAlarmProtegeRes(AlarmProtege alarm) {

        // 해당 알람 시간의 약 정보 조회
        List<AlarmMedicineRes> alarmMedicineRes
                = memberMedicineRepository.findByAlarmProtege(alarm.getProtege(), alarm.getAlarmTime());

        return AlarmProtegeRes.builder()
                .nickName(alarm.getProtege().getMemberNickname())
                .pillList(alarmMedicineRes).build();

    }

    /*
    보호자 알림 목록 조회
     */
    @Override
    public List<ProtectorAlarmRes> getAlarmProtectorList(Member protector, Member protege) {

        return alarmProtectorRepository.findByProtectorAndProtege(protector, protege);
    }

    /*
    보호자 알람 상세정보 조회
     */
    @Override
    public ProtectorAlarmInfoRes getAlarmInfo(Long alarmSeq) {

        AlarmProtector alarmProtector = alarmProtectorRepository.findById(alarmSeq).orElseThrow(()-> new NotFoundException(ErrorCode.ALARM_NOT_FOUND));

        List<AlarmMedicineRes> alarmMedicineResList = memberMedicineRepository.findByAlarmProtege(alarmProtector.getAlarmProtege().getProtege()
                , alarmProtector.getAlarmProtege().getAlarmTime());

        return ProtectorAlarmInfoRes.builder()
                .alarmProtectorSeq(alarmProtector.getAlarmSeq())
                .protegeName(alarmProtector.getAlarmProtege().getProtege().getMemberNickname())
                .alarmDate(alarmProtector.getAlarmProtege().getAlarmDate())
                .alarmTime(alarmProtector.getAlarmProtege().getAlarmTime())
                .takeTime(alarmProtector.getCreatedTime().toLocalTime())
                .photoURL(alarmProtector.getAlarmPhoto())
                .medicineList(alarmMedicineResList)
                .medicineCountDetected(alarmProtector.getMedicineCountDetected())
                .build();
    }

    /*
    보호자 알람 상세정보 삭제
    */
    @Override
    public void deleteAlarmInfo(Long alarmSeq) {

        alarmProtectorRepository.deleteById(alarmSeq);
    }

    /*
    피보호자 복용 인증 사진 업로드
     */
    @Override
    public void uploadTaking(UploadReq req) {
        AlarmProtege alarm = alarmProtegeRepository.findById(req.getAlarmSeq())
                .orElseThrow(() -> new NotFoundException(ErrorCode.ALARM_NOT_FOUND));

        byte[] imageBytes = DatatypeConverter.parseBase64Binary(req.getImage());
        String path = "/" + alarm.getProtege().getMemberSeq() + "_" + req.getAlarmSeq() + ".jpg";
        File file = new File(path);

        // Base64 -> File로 변환
        try {
            BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
            ImageIO.write(bufImg, "jpg",file);
        } catch (IOException e) {
            throw new InvalidException(ErrorCode.UPLOAD_FAIL);
        }

        String imgURL = s3Uploader.upload(file,"upload");

        int cnt = 0;
        StringBuilder response = null;
        
        try {
            URL url = new URL("https://k6a307.p.ssafy.io/detect/");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "applicaiton/json;utf-8");
            con.setRequestProperty("Accept", "application/json");
            con.setDoOutput(true);

            String jsonInputString = "{\"url\":\"" + imgURL + "\"}";

            try (OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }


            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
            }
            cnt = Integer.parseInt(response.toString().substring(response.length()-2,response.length()-1));

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<Member> protectors = familyRepository.findFamilyByMember(alarm.getProtege());

        // 보호자 알림 생성
        for (Member protector : protectors) {
            AlarmProtector alarmProtector = alarmProtectorRepository.save(AlarmProtector.builder()
                    .protector(protector)
                    .alarmProtege(alarm)
                    .alarmPhoto(imgURL)
                    .medicineCountDetected(cnt)
                    .build());

            String token = protector.getMemberFcmToken();
            String title = "복용 완료 알림";
            String body = alarm.getProtege().getMemberNickname()+"님이 약을 복용하였습니다.";

            if(token!=null) {
                try {
                    String url = "https://pillimi.com/member-pill-check/pill-picture-alarm/"
                            +alarmProtector.getAlarmSeq() + "/" + alarmProtector.getAlarmProtege().getProtege().getMemberSeq();
                    firebaseMessageService.sendMessageToProtector(token, title, body, imgURL,url);
                } catch (IOException e) {
                    log.info(protector.getMemberNickname() + " 님에게 보호자 알림 전송을 실패하였습니다.");
                }
            }
        }

        // 해당 시간 복용 완료 처리
        memberMedicineRepository
                .updateMemberMedicine(alarm.getProtege(),alarm.getAlarmTime(), LocalDate.now().getDayOfWeek().getValue());
    }
}

