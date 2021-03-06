package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.UploadReq;

import com.pillimi.backend.api.response.ProtectorAlarmInfoRes;
import com.pillimi.backend.api.response.AlarmProtegeRes;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;
import java.util.Optional;

public interface AlarmService {

    Optional<AlarmProtege> getAlarmProtegeById(Long alarmSeq);

    ProtectorAlarmInfoRes getAlarmInfo(Long alarmSeq);

    AlarmProtegeRes getAlarmProtegeRes(AlarmProtege alarm);

    List<ProtectorAlarmRes> getAlarmProtectorList(Member protector, Member protege);

    void deleteAlarmInfo(Long alarmSeq);

    void uploadTaking(UploadReq req);
}
