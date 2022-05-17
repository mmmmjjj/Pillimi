package com.pillimi.backend.scheduler;

import com.pillimi.backend.api.service.FirebaseMessageService;
import com.pillimi.backend.common.model.SchedulerDTO;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.entity.MedicineIngredient;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.MemberMedicine;
import com.pillimi.backend.db.repository.*;
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

    private final FirebaseMessageService firebaseMessageService;
    private final AlarmProtegeRepository alarmProtegeRepository;

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
            String title = "약 드실 시간입니다.💙(테스트서버)";
            String body = now.format(DateTimeFormatter.ofPattern("HH시 mm분"))
                    + " 알림을 눌러 약을 복용해주세요.";
            String url = "https://k6a3071.p.ssafy.io/family/camera/"+alarm.getAlarmSeq();
            try {
                firebaseMessageService.sendMessageWithoutImage(token,title,body,url);
            } catch (IOException e) {
                log.info(now+" : "+alarm.getProtege().getMemberNickname()+" 님에게 알림 전송을 실패하였습니다.");
            }
        }


    }

}
