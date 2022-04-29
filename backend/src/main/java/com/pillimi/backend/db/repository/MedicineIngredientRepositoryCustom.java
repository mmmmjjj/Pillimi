package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Medicine;
import com.pillimi.backend.db.entity.MedicineIngredient;
import com.pillimi.backend.db.entity.Member;

import java.util.List;

public interface MedicineIngredientRepositoryCustom {

    /*
     * member의 가족 리스트를 조회한다.
     */
    List<MedicineIngredient> findMedicineIngredientByMedicine(Medicine Medicine);
}
