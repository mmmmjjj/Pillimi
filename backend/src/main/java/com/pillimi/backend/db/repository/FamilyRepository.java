package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long>, FamilyRepositoryCustom {
    void deleteByProtectorAndProtege(Member protector, Member protege);
}
