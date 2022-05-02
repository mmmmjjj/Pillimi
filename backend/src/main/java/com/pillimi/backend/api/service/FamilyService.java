package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;

import java.util.List;

public interface FamilyService {
    void createFamily(FamilyRegistReq req);
    List<Family> findAll();
    long delete(long familySeq);
}
