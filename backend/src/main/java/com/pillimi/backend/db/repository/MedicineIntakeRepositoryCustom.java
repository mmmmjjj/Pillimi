package com.pillimi.backend.db.repository;

import com.pillimi.backend.common.model.SchedulerDTO;

import java.util.List;

public interface MedicineIntakeRepositoryCustom {

    /*
     * 오늘 존재하는 모든 알람을 조회한다.
     */
    List<SchedulerDTO> findAllTodayAlarm();
}
