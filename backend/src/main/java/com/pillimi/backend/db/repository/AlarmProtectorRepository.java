package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.AlarmProtector;
import com.pillimi.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmProtectorRepository extends JpaRepository<AlarmProtector, Long>, AlarmProtectorRepositoryCustom {

}
