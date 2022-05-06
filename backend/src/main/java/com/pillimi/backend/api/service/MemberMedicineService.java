package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.MemberMedicineCreateReq;
import com.pillimi.backend.api.request.MemberMedicineUpdateReq;
import com.pillimi.backend.api.response.CheckMedicineRes;
import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.db.entity.MemberMedicine;

import java.util.List;

public interface MemberMedicineService {


    void createMemberMedicine(MemberMedicineCreateReq req);

    void updateMemberMedicine(MemberMedicineUpdateReq req);

    void deleteMemberMedicine(Long memberMedicineSeq);

    List<MemberMedicineRes> getMemberMedicine(Long memberSeq);

    MemberMedicineRes getMemberMedicineInfo(Long memberMedicineSeq);
    CheckMedicineRes checkMemberMedicine(Long memberSeq, Long medicineSeq);
}
