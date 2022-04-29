package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;

public interface FamilyService {
    FamilyRequest createFamily(FamilyRegistReq req);
}
