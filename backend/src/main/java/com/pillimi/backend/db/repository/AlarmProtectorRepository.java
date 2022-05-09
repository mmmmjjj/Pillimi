package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.AlarmProtector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmProtectorRepository extends JpaRepository<AlarmProtector, Long> {
}
