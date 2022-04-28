package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.MemberMedicineReq;
import com.pillimi.backend.api.request.RegisterReq;
import com.pillimi.backend.api.request.UpdateMemberReq;
import com.pillimi.backend.api.response.MemberInfoRes;
import com.pillimi.backend.common.auth.JwtTokenProvider;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.model.KakaoProfile;
import com.pillimi.backend.common.model.RoleType;
import com.pillimi.backend.db.entity.*;
import com.pillimi.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberMedicineServiceImpl implements MemberMedicineService {

    private final MemberMedicineRepository memberMedicineRepository;

    private final MedicineRepository medicineRepository;

    private final RemarkRepository remarkRepository;



    @Override
    public void createMemberMedicine(Member member, MemberMedicineReq req) {

        Medicine medicine = medicineRepository.getById(req.getMedicineSeq());
        if(medicine==null){
            throw new AccessDeniedException(ErrorCode.MEDICINE_NOT_FOUND.getCode());
        }

        MemberMedicine newMemberMedicine = MemberMedicine.builder().memberSeq(member)
                .medicineSeq(medicine)
                .memberMedicineName(req.getMemberMedicineName())
                .memberMedicineStart(req.getStartDay())
                .memberMedicineEnd(req.getEndDay())
                .memberMedicineNow(true)
                .build();

        MemberMedicine memberMedicine = memberMedicineRepository.save(newMemberMedicine);

//        MedicineIntake newMedicineIntake = MedicineIntake.builder().

        Remark remark = remarkRepository.save(Remark.builder().memberSeq(member)
                .medicineSeq(medicine)
                .remarkContent(req.getRemarkContent())
                .remarkDate(LocalDate.now())
                .build());
    }
}
