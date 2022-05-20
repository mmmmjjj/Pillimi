package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface FamilyRequestRepositoryCustom {

    /*
     * member의 가족요청 리스트를 조회한다.
     */
    List<FamilyRequestRes> findFamilyRequestByMember(Member member);
}
