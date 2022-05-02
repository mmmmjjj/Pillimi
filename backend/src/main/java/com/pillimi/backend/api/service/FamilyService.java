package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.api.response.FamilyRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface FamilyService {

    List<FamilyRequestRes> getFamilyRequestList(Member member);

    void addFamily(Member member, Long familyRequestSeq);

    void rejectFamilyRequest(Member member, Long familyRequestSeq);

    void createFamily(FamilyRegistReq req);

    List<FamilyRes> getFamilyList(Member member);
    
    long delete(long familySeq);
}
