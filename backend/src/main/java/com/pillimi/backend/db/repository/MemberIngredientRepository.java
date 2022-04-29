package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Ingredient;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.MemberIngredient;
import com.pillimi.backend.db.entity.MemberMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberIngredientRepository extends JpaRepository<MemberIngredient, Long>, MemberIngredientRepositoryCustom {


}
