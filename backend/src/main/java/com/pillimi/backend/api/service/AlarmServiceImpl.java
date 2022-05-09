package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.api.response.SearchRes;
import com.pillimi.backend.db.entity.AlarmProtector;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.AlarmProtectorRepository;
import com.pillimi.backend.db.repository.MedicineRepository;
import io.swagger.v3.oas.models.links.Link;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    private final AlarmProtectorRepository alarmProtectorRepository;

    @Override
    public List<ProtectorAlarmRes> getList(Member member) {
        List<AlarmProtector> alarmProtectors = alarmProtectorRepository.findByProtector(member);

        List<ProtectorAlarmRes> protectorAlarmResList = new LinkedList<>();
        for(AlarmProtector alarmProtector : alarmProtectors){
            ProtectorAlarmRes protectorAlarmRes = ProtectorAlarmRes.builder().alarmProtectorSeq(alarmProtector.getAlarmSeq())
                    .protectorSeq(alarmProtector.getProtector().getMemberSeq())
                    .protegeSeq(alarmProtector.getAlarmProtege().getProtege().getMemberSeq())
                    .protegeName(alarmProtector.getAlarmProtege().getProtege().getMemberNickname())
                    .alarmDate(alarmProtector.getAlarmProtege().getAlarmDate())
                    .alarmTime(alarmProtector.getAlarmProtege().getAlarmTime())
                    .photoURL(alarmProtector.getAlarmPhoto())
                    .build();

            protectorAlarmResList.add(protectorAlarmRes);
        }
        return protectorAlarmResList;
    }
}
