package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Medicine;
import com.pillimi.backend.db.entity.MedicineIntake;
import com.pillimi.backend.db.entity.MemberMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineIntakeRepository extends JpaRepository<MedicineIntake, Long> {

    MedicineIntake getByMemberMedicine(MemberMedicine memberMedicine);

    void deleteByMemberMedicine(MemberMedicine memberMedicine);
}
