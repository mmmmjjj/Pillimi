package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.AlarmMedicineRes;
import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.api.response.TodayMedicineRes;
import com.pillimi.backend.db.entity.*;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface MemberMedicineRepositoryCustom {

    Optional<MemberMedicine> findByMemberAndMedicine(Member member, Medicine medicine);

    /*
     * 해당 회원의 오늘 먹을 약품을 시간순으로 조회한다.
     */
    List<TodayMedicineRes> findTodayMedicineList(Member member);

    /*
     * 해당 알림 시간에 복용하는 약 목록을 조회한다.
     */
    List<AlarmMedicineRes> findByAlarmProtege(Member member,LocalTime time);

}
