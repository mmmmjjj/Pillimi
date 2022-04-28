package com.pillimi.backend.db.repository;

import com.pillimi.backend.api.response.SearchRes;
import com.pillimi.backend.db.entity.QMedicine;
import com.pillimi.backend.db.entity.QShape;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MedicineRepositoryCustomImpl implements MedicineRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMedicine qMedicine = QMedicine.medicine;
    QShape qShape = QShape.shape;

    /*
     * medicine_name에 keyword가 포함되는 약 리스트를 조회한다.
     */
    @Override
    public List<SearchRes> findByMedicineNameContaining(String keyword) {
        return jpaQueryFactory.select(Projections.constructor(SearchRes.class,
                        qMedicine.medicineSeq, qMedicine.medicineName, qShape.shapeImage))
                .from(qMedicine).leftJoin(qShape)
                .on(qShape.shapeSeq.eq(qMedicine.shape.shapeSeq))
                .where(qMedicine.medicineName.contains(keyword)).fetch();
    }
}
