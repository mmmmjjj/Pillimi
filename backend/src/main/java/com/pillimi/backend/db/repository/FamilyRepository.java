package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long>, FamilyRepositoryCustom {
    long deleteByFamilySeq(long familySeq);
}
