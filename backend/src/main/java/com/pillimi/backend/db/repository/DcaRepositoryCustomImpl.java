package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class DcaRepositoryCustomImpl implements DcaRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMember qMember = QMember.member;
    QFamily qFamily = QFamily.family;
    QDca qDca = QDca.dca;


    @Override
    public Optional<Dca> findByRelationAndAvoid(Ingredient relation, Ingredient avoid) {
        Dca dca = jpaQueryFactory.select(qDca)
                .from(qDca)
                .where(qDca.relation.ingredientSeq.eq(relation.getIngredientSeq())
                        .and(qDca.avoid.ingredientSeq.eq(avoid.getIngredientSeq())))
                .fetchFirst();
        return Optional.ofNullable(dca);
    }
}
