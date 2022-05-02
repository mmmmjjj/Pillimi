package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.QFamilyRequest;
import com.pillimi.backend.db.entity.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class FamilyRequestRepositoryCustomImpl implements FamilyRequestRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QFamilyRequest qFamilyRequest = QFamilyRequest.familyRequest;
    QMember qMember = QMember.member;


    /*
     * member의 가족요청 리스트를 조회한다.
     */
    @Override
    public List<FamilyRequestRes> findFamilyRequestByMember(Member member) {
        return jpaQueryFactory.select(Projections.constructor(FamilyRequestRes.class,
                qFamilyRequest.familyRequestSeq,
                qMember.memberNickname,
                qMember.memberPhone,
                qMember.memberImage))
                .from(qFamilyRequest)
                .join(qMember)
                .on(qFamilyRequest.requestProtector.eq(qMember))
                .where(qFamilyRequest.requestProtege.eq(member))
                .fetch();
    }
}
