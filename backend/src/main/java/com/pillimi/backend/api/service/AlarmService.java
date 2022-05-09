package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.AlarmProtegeRes;
import com.pillimi.backend.db.entity.AlarmProtege;

import java.util.Optional;

public interface AlarmService {

    Optional<AlarmProtege> getAlarmProtegeById(Long alarmSeq);

    AlarmProtegeRes getAlarmProtegeRes(AlarmProtege alarm);
}
