package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.MedicineDetailRes;
import com.pillimi.backend.api.response.SearchRes;
import com.pillimi.backend.db.entity.Medicine;

import java.util.List;

public interface MedicineRepositoryCustom {

    /*
     * medicine_name에 keyword가 포함되는 약 리스트를 조회한다.
     */
    List<SearchRes> findByMedicineNameContaining(String keyword);

    /*
     * 약품의 상세 정보를 조회한다.
     */
    MedicineDetailRes findDetailInfo(Medicine medicine);

    /*
     * 약품의 성분 리스트를 주성분, 첨가제 순으로 조회한다.
     */
    List<String> findIngredientList(Medicine medicine);
}
