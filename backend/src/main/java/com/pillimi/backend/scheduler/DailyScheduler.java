package com.pillimi.backend.scheduler;

import com.pillimi.backend.api.service.FirebaseMessageService;
import com.pillimi.backend.common.model.SchedulerDTO;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.repository.AlarmProtegeRepository;
import com.pillimi.backend.db.repository.MedicineIntakeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DailyScheduler {

    private final MedicineIntakeRepository medicineIntakeRepository;
    private final AlarmProtegeRepository alarmProtegeRepository;
    private final FirebaseMessageService firebaseMessageService;


    /*
    매일 서버시간 00:00시에 피보호자 알림 생성
    */
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void DailyCreateAlarm() {

        List<SchedulerDTO> list = medicineIntakeRepository.findAllTodayAlarm();

        for (SchedulerDTO item : list) {
            alarmProtegeRepository.save(AlarmProtege.builder()
                    .alarmDate(LocalDate.now())
                    .alarmTime(item.getTime())
                    .protege(item.getMember())
                    .build());
        }

        // TODO 이전 알림 삭제 기능 추가????

        log.info(LocalDate.now()+" 알림 생성 스케줄러 작업 완료");
    }

    /*
    10분마다 알림 체크 후 알림이 존재하면 앱으로 push 알림 전송
    */
    @Scheduled(cron = "*/10 * * * * ?")
    @Transactional
    public void pushNotification() {

        LocalDateTime now = LocalDateTime.now();
        // 해당 시간 알림 목록 가져옴
        List<AlarmProtege> list = alarmProtegeRepository.findByAlarmDateAndAlarmTime(now.toLocalDate(),now.toLocalTime());

        // 반복문 돌면서 알림 전송
        for (AlarmProtege alarm : list) {
            String token = alarm.getProtege().getMemberFcmToken();
            String title = "약 드실 시간입니다.💙";
            String body = now.format(DateTimeFormatter.ofPattern("HH시 mm분"))
                    + " 알림을 눌러 약을 복용해주세요.";
            String url = "https://k6a307.p.ssafy.io/family/camera/"+alarm.getAlarmSeq();
            try {
                firebaseMessageService.sendMessageToProtege(token,title,body,url);
            } catch (IOException e) {
                log.info(now+" : "+alarm.getProtege().getMemberNickname()+" 님에게 알림 전송을 실패하였습니다.");
            }
        }


    }

}
