package com.pillimi.backend.scheduler;

import com.pillimi.backend.common.model.SchedulerDTO;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.repository.AlarmProtegeRepository;
import com.pillimi.backend.db.repository.MedicineIntakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DailyScheduler {

    private final MedicineIntakeRepository medicineIntakeRepository;

    private final AlarmProtegeRepository alarmProtegeRepository;

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

    }

}
