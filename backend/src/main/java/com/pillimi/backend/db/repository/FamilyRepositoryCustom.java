package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FamilyRepositoryCustom {

    /*
     * member의 가족 리스트를 조회한다.
     */
    List<Member> findFamilyByMember(Member member);

    Optional<Family> findFamilyByProtectorAndProtege(Member protector, Member protege);
}
