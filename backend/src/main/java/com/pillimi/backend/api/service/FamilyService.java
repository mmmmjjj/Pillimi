package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.api.response.FamilyRes;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.Family;

import java.util.Optional;

import java.util.List;

public interface FamilyService {

    List<FamilyRequestRes> getFamilyRequestList(Member member);

    void addFamily(Member member, Long familyRequestSeq);

    void rejectFamilyRequest(Member member, Long familyRequestSeq);

    void createFamily(Member member, FamilyRegistReq req);

    List<FamilyRes> getFamilyList(Member member);
    
    void deleteFamily(Member member, Member target);

    Optional<Family> checkFamily(Member protector, Member protege);

}
