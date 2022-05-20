package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.MedicineInfoRes;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.Medicine;
import com.pillimi.backend.db.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;

    /*
    약품 상세 정보 조회
     */
    @Override
    public MedicineInfoRes getMedicineInfo(Long medicineSeq) {

        Medicine medicine = medicineRepository.findById(medicineSeq)
                .orElseThrow(() -> new NotFoundException(ErrorCode.MEDICINE_NOT_FOUND));

        return MedicineInfoRes.builder()
                .medicineDetail(medicineRepository.findDetailInfo(medicine))
                .ingredientList(medicineRepository.findIngredientList(medicine)).build();
    }
}
