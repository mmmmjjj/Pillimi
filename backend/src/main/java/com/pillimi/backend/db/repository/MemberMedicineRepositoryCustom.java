package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.*;

import java.util.Optional;

public interface MemberMedicineRepositoryCustom {

    Optional<MemberMedicine> findByMemberAndMedicine(Member member, Medicine medicine);

}
