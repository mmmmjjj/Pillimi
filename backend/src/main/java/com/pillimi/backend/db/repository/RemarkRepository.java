package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.Remark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RemarkRepository extends JpaRepository<Remark, Long> {


}
