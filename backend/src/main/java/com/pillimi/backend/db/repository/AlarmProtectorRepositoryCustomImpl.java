package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.db.entity.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AlarmProtectorRepositoryCustomImpl implements AlarmProtectorRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QAlarmProtector qAlarmProtector = QAlarmProtector.alarmProtector;

}
