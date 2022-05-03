package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.MemberIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberIngredientRepository extends JpaRepository<MemberIngredient, Long>, MemberIngredientRepositoryCustom {
    List<MemberIngredient> findByMember(Member member);
}
