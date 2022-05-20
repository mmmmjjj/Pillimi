package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.FamilyRequest;
import com.pillimi.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRequestRepository extends JpaRepository<FamilyRequest, Long>, FamilyRequestRepositoryCustom{

    Optional<FamilyRequest> findByRequestProtectorAndRequestProtege(Member protector, Member protege);
}
