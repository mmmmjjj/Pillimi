package com.pillimi.backend.api.service;


import com.pillimi.backend.api.response.*;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.AlarmProtector;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.AlarmProtectorRepository;
import com.pillimi.backend.db.repository.AlarmProtegeRepository;
import com.pillimi.backend.db.repository.MemberMedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
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
                = memberMedicineRepository.findByAlarmProtege(alarm.getProtege(), alarm.getAlarmTime());

        return AlarmProtegeRes.builder()
                .nickName(alarm.getProtege().getMemberNickname())
                .pillList(alarmMedicineRes).build();

    }

    /*
    보호자 알림 목록 조회
     */
    @Override
    public List<ProtectorAlarmRes> getAlarmProtectorList(Member member){

        List<AlarmProtector> alarmProtectors = alarmProtectorRepository.findByProtector(member);

        List<ProtectorAlarmRes> protectorAlarmResList = new LinkedList<>();
        for (AlarmProtector alarmProtector : alarmProtectors) {
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

    /*
    보호자 알람 상세정보 조회
     */
    @Override
    public ProtectorAlarmInfoRes getAlarmInfo(Long alarmSeq) {

        AlarmProtector alarmProtector = alarmProtectorRepository.findById(alarmSeq).orElseThrow(()-> new NotFoundException(ErrorCode.ALARM_NOT_FOUND));

        List<AlarmMedicineRes> alarmMedicineResList = memberMedicineRepository.findByAlarmProtege(alarmProtector.getAlarmProtege().getProtege()
                , alarmProtector.getAlarmProtege().getAlarmTime());



        ProtectorAlarmInfoRes protectorAlarmInfoRes = ProtectorAlarmInfoRes.builder()
                .alarmProtectorSeq(alarmProtector.getAlarmSeq())
                .protectorSeq(alarmProtector.getProtector().getMemberSeq())
                .protegeSeq(alarmProtector.getAlarmProtege().getProtege().getMemberSeq())
                .protegeName(alarmProtector.getAlarmProtege().getProtege().getMemberNickname())
                .alarmDate(alarmProtector.getAlarmProtege().getAlarmDate())
                .alarmTime(alarmProtector.getAlarmProtege().getAlarmTime())
                .photoURL(alarmProtector.getAlarmPhoto())
                .medicineList(alarmMedicineResList)
                .build();

        return protectorAlarmInfoRes;
    }

    /*
        보호자 알람 상세정보 삭제
    */
    @Override
    public void deleteAlarmInfo(Long alarmSeq) {

        alarmProtectorRepository.deleteById(alarmSeq);
    }
}

