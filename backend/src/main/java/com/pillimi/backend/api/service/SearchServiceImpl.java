package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.SearchRes;
import com.pillimi.backend.db.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final MedicineRepository medicineRepository;

    /*
    이름으로 약품 검색
     */
    @Override
    public List<SearchRes> searchByName(String keyword) {
        return medicineRepository.findByMedicineNameContaining(keyword);
    }
}
