package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.db.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AlarmProtectorRepositoryCustomImpl implements AlarmProtectorRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QAlarmProtector qAlarmProtector = QAlarmProtector.alarmProtector;

    QAlarmProtege qAlarmProtege = QAlarmProtege.alarmProtege;

    @Override
    public List<ProtectorAlarmRes> findByProtectorAndProtege(Member protector, Member protege) {

        return jpaQueryFactory.select(Projections.constructor(ProtectorAlarmRes.class,
                        qAlarmProtector.alarmSeq,
                        qAlarmProtector.alarmProtege.protege.memberNickname,
                        qAlarmProtector.alarmProtege.alarmDate,
                        qAlarmProtector.alarmProtege.alarmTime,
                        qAlarmProtector.createdTime,
                        qAlarmProtector.alarmPhoto))
                .from(qAlarmProtector)
                .where(qAlarmProtector.alarmProtege.protege.memberSeq.eq(protege.getMemberSeq())
                        .and(qAlarmProtector.protector.eq(protector)))
                .fetch();
    }
}
