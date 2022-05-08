package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class MemberMedicineRepositoryCustomImpl implements MemberMedicineRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMemberMedicine qMemberMedicine = QMemberMedicine.memberMedicine;


    @Override
    public Optional<MemberMedicine> findByMemberAndMedicine(Member member, Medicine medicine) {
        MemberMedicine memberMedicine = jpaQueryFactory.select(qMemberMedicine)
                .from(qMemberMedicine)
                .where(qMemberMedicine.member.memberSeq.eq(member.getMemberSeq())
                        .and(qMemberMedicine.medicine.medicineSeq.eq(medicine.getMedicineSeq())
                                .and(qMemberMedicine.memberMedicineNow.eq(true))))
                .fetchFirst();
        return Optional.ofNullable(memberMedicine);
    }
}
