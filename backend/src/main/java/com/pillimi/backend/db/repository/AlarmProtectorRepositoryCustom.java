package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface AlarmProtectorRepositoryCustom {

    List<ProtectorAlarmRes> findByProtectorAndProtege(Member protector, Member protege);
}
