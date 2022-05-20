package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Medicine;
import com.pillimi.backend.db.entity.MedicineIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineIngredientRepository extends JpaRepository<MedicineIngredient, Long>, MedicineIngredientRepositoryCustom {

}
