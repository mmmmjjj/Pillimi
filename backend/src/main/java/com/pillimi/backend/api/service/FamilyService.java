package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;
import com.pillimi.backend.db.entity.Member;

import java.util.Optional;

public interface FamilyService {
    FamilyRequest createFamily(FamilyRegistReq req);

    Optional<Family> checkFamily(Member protector, Member protege);
}
