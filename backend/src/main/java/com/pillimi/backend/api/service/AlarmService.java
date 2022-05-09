package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.ProtectorAlarmInfoRes;
import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.api.response.SearchRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface AlarmService {


    List<ProtectorAlarmRes> getList(Member member);

    ProtectorAlarmInfoRes getAlarmInfo(Long alarmSeq);
}
