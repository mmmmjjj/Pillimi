package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.SearchRes;

import java.util.List;

public interface MedicineRepositoryCustom {

    /*
     * medicine_name에 keyword가 포함되는 약 리스트를 조회한다.
     */
    List<SearchRes> findByMedicineNameContaining(String keyword);
}
