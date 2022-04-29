package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.MemberMedicineCreateReq;
import com.pillimi.backend.api.request.MemberMedicineUpdateReq;
import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface MemberMedicineService {


    void createMemberMedicine(Member member, MemberMedicineCreateReq req);

    void updateMemberMedicine(Member member, MemberMedicineUpdateReq req);

    void deleteMemberMedicine(Member member, Long memberMedicineSeq);

    List<MemberMedicineRes> getMemberMedicine(Member member);
}
