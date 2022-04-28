package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long>, MedicineRepositoryCustom {

}
