package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.MemberMedicineReq;
import com.pillimi.backend.api.request.RegisterReq;
import com.pillimi.backend.api.request.UpdateMemberReq;
import com.pillimi.backend.api.response.MemberInfoRes;
import com.pillimi.backend.common.model.KakaoProfile;
import com.pillimi.backend.common.model.RoleType;
import com.pillimi.backend.db.entity.Member;

import java.util.Optional;

public interface MemberMedicineService {


    void createMemberMedicine(Member member, MemberMedicineReq req);
}
