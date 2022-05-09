package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.AlarmMedicineRes;
import com.pillimi.backend.api.response.AlarmProtegeRes;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.repository.AlarmProtectorRepository;
import com.pillimi.backend.db.repository.AlarmProtegeRepository;
import com.pillimi.backend.db.repository.MemberMedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AlarmServiceImpl implements AlarmService {

    private final AlarmProtegeRepository alarmProtegeRepository;

    private final AlarmProtectorRepository alarmProtectorRepository;

    private final MemberMedicineRepository memberMedicineRepository;

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

        List<AlarmMedicineRes> alarmMedicineRes
                = memberMedicineRepository.findByAlarmProtege(alarm.getProtege(),alarm.getAlarmTime());

        return AlarmProtegeRes.builder()
                .nickName(alarm.getProtege().getMemberNickname())
                .pillList(alarmMedicineRes).build();
    }
}
