package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.QFamily;
import com.pillimi.backend.db.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class FamilyRepositoryCustomImpl implements FamilyRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMember qMember = QMember.member;
    QFamily qFamily = QFamily.family;

    /*
     * member의 가족 리스트를 조회한다.
     */
    @Override
    public List<Member> findFamilyByMember(Member member) {

        // member가 보호자일 경우
        if (member.getMemberIsprotector() == 1)
            return jpaQueryFactory.select(qMember)
                    .from(qFamily)
                    .join(qMember)
                    .on(qFamily.protege.eq(qMember))
                    .where(qFamily.protector.eq(member))
                    .fetch();
        // TODO 피보호자일 경우 어디까지가 가족인가?
        else return null;
    }
}
