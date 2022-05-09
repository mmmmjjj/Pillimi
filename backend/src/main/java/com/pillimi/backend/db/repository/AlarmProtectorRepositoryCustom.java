package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.db.entity.AlarmProtector;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface AlarmProtectorRepositoryCustom {

    List<AlarmProtector> findByProtectorSeq(Member member);

}
