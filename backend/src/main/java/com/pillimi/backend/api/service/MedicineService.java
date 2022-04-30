package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.MedicineInfoRes;

public interface MedicineService {

    MedicineInfoRes getMedicineInfo(Long medicineSeq);
}
