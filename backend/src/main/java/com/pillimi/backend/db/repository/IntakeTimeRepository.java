package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.IntakeTime;
import com.pillimi.backend.db.entity.MedicineIntake;
import com.pillimi.backend.db.entity.MemberMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IntakeTimeRepository extends JpaRepository<IntakeTime, Long> {

    void deleteByMedicineIntake(MedicineIntake medicineIntake);

    List<IntakeTime> findByMedicineIntake(MedicineIntake medicineIntake);
}
