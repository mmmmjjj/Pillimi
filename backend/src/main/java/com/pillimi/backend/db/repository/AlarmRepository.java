package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Alarm;
import com.pillimi.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    Alarm findByAlarmDateAndAlarmTimeAndReceiver(LocalDate now, LocalTime time, Member member);
}
