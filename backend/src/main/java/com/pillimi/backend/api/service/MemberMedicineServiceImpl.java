package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.MemberMedicineCreateReq;
import com.pillimi.backend.api.request.MemberMedicineUpdateReq;
import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.*;
import com.pillimi.backend.db.repository.*;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberMedicineServiceImpl implements MemberMedicineService {

    private final MemberMedicineRepository memberMedicineRepository;

    private final MemberRepository memberRepository;

    private final MedicineRepository medicineRepository;

    private final MedicineIntakeRepository medicineIntakeRepository;

    private final MedicineIngredientRepository medicineIngredientRepository;

    private final MemberIngredientRepository memberIngredientRepository;

    private final RemarkRepository remarkRepository;

    private final IntakeTimeRepository intakeTimeRepository;



    @Override
    public void createMemberMedicine(MemberMedicineCreateReq req) {

        Member member = memberRepository.getById(req.getMemberSeq());
        Medicine medicine = medicineRepository.getById(req.getMedicineSeq());
        if(medicine==null){
            throw new NotFoundException(ErrorCode.MEDICINE_NOT_FOUND.getCode());
        }


        MemberMedicine memberMedicine = memberMedicineRepository.save(MemberMedicine.builder().member(member)
                .medicine(medicine)
                .memberMedicineName(req.getMemberMedicineName())
                .memberMedicineNow(true)
                .build());

        MedicineIntake medicineIntake = medicineIntakeRepository.save(MedicineIntake.builder()
                .memberMedicine(memberMedicine)
                .intakeDay(req.getIntakeDay())
                .intakeIsconfirm(false)
                .intakeCount(req.getIntakeCount())
                .intakeStart(req.getStartDay())
                .intakeEnd(req.getEndDay())
                .build());

        for(Double time : req.getIntakeTime()){
            intakeTimeRepository.save(IntakeTime.builder()
                    .medicineIntake(medicineIntake)
                    .intakeTime(time)
                    .build());
        }


        List<MedicineIngredient> medicineIngredients = medicineIngredientRepository.findMedicineIngredientByMedicine(medicine);

        for(MedicineIngredient medicineIngredient : medicineIngredients){
            System.out.println(medicineIngredient.getIngredient().getIngredientSeq());
        }

        for(MedicineIngredient medicineIngredient : medicineIngredients){
            memberIngredientRepository.save(MemberIngredient.builder()
                    .Ingredient(medicineIngredient.getIngredient())
                    .member(member)
                    .build());
        }

        Remark remark = remarkRepository.save(Remark.builder().memberMedicine(memberMedicine)
                .remarkContent(req.getRemarkContent())
                .remarkDate(LocalDate.now())
                .build());
        System.out.println(LocalDate.now());
    }

    @Override
    public void updateMemberMedicine(MemberMedicineUpdateReq req) {

        Member member = memberRepository.getById(req.getMemberSeq());
        Medicine medicine = medicineRepository.getById(req.getMedicineSeq());
        if(medicine==null){
            throw new NotFoundException(ErrorCode.MEDICINE_NOT_FOUND.getCode());
        }

        MemberMedicine memberMedicine = memberMedicineRepository.save(MemberMedicine.builder().member(member)
                        .memberMedicineSeq(req.getMemberMedicineSeq())
                        .medicine(medicine)
                        .memberMedicineName(req.getMemberMedicineName())
                        .memberMedicineNow(true)
                        .build());

        MedicineIntake medicineIntake = medicineIntakeRepository.getByMemberMedicine(memberMedicine);

        medicineIntakeRepository.save(MedicineIntake.builder()
                        .medicineIntakeSeq(medicineIntake.getMedicineIntakeSeq())
                        .memberMedicine(memberMedicine)
                        .intakeDay(req.getIntakeDay())
                        .intakeIsconfirm(medicineIntake.isIntakeIsconfirm())
                        .intakeCount(req.getIntakeCount())
                        .intakeStart(req.getStartDay())
                        .intakeEnd(req.getEndDay())
                        .build());

        intakeTimeRepository.deleteByMedicineIntake(medicineIntake);

        for(Double time : req.getIntakeTime()){
            intakeTimeRepository.save(IntakeTime.builder()
                    .medicineIntake(medicineIntake)
                    .intakeTime(time)
                    .build());
        }


        Remark remark = remarkRepository.getByMemberMedicine(memberMedicine);
        remarkRepository.save(Remark.builder()
                        .remarkSeq(remark.getRemarkSeq())
                        .memberMedicine(memberMedicine)
                        .remarkContent(req.getRemarkContent())
                        .remarkDate(LocalDate.now())
                        .build());
        System.out.println(LocalDate.now());
    }

    @Override
    public void deleteMemberMedicine(Long memberMedicineSeq) {

        MemberMedicine memberMedicine = memberMedicineRepository.getById(memberMedicineSeq);
        if(memberMedicine == null){
            throw new NotFoundException(ErrorCode.MEMBER_MEDICINE_NOT_FOUND.getCode());
        }

        List<MedicineIngredient> medicineIngredients = medicineIngredientRepository.findMedicineIngredientByMedicine(memberMedicine.getMedicine());

        Member member = memberMedicine.getMember();

        for(MedicineIngredient medicineIngredient : medicineIngredients){
            memberIngredientRepository.deleteByMemberAndIngredient(member, medicineIngredient.getIngredient());
        }

        memberMedicine.setMemberMedicineNow(false);
        memberMedicineRepository.save(memberMedicine);
    }

    @Override
    public List<MemberMedicineRes> getMemberMedicine(Long memberSeq) {

        Member member = memberRepository.getById(memberSeq);

        List<MemberMedicine> memberMedicines = memberMedicineRepository.getByMember(member);
        List<MemberMedicineRes> memberMedicineResList = new LinkedList<MemberMedicineRes>();
        for(MemberMedicine memberMedicine : memberMedicines){
            MedicineIntake medicineIntake = medicineIntakeRepository.getByMemberMedicine(memberMedicine);
            Remark remark = remarkRepository.getByMemberMedicine(memberMedicine);
            List<Double> Times = new LinkedList<Double>();
            List<IntakeTime> intakeTimes = intakeTimeRepository.findByMedicineIntake(medicineIntake);
            for(IntakeTime intakeTime : intakeTimes){
                Times.add(intakeTime.getIntakeTime());
            }

            MemberMedicineRes memberMedicineRes = MemberMedicineRes.builder()
                    .memberMedicineSeq(memberMedicine.getMemberMedicineSeq())
                    .imageURL("www.jcgroup.hk/wp-content/uploads/2019/08/test-img-300x194_2.png")
                    .medicineSeq(memberMedicine.getMedicine().getMedicineSeq())
                    .memberMedicineName(memberMedicine.getMemberMedicineName())
                    .startDay(medicineIntake.getIntakeStart())
                    .endDay(medicineIntake.getIntakeEnd())
                    .intakeDay(medicineIntake.getIntakeDay())
                    .intakeTime(Times)
                    .intakeCount(medicineIntake.getIntakeCount())
                    .remarkContent(remark.getRemarkContent())
                    .isNow(memberMedicine.isMemberMedicineNow())
                    .build();

            memberMedicineResList.add(memberMedicineRes);
        }
        return memberMedicineResList;
    }

    @Override
    public MemberMedicine getMemberMedicineInfo(Long memberMedicineSeq) {
        MemberMedicine memberMedicine = memberMedicineRepository.findByMemberMedicineSeq(memberMedicineSeq);
        return memberMedicine;
    }


}
