package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.FamilyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRequestRepository extends JpaRepository<FamilyRequest, Long>, FamilyRequestRepositoryCustom{

}
