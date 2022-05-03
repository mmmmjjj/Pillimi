package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Dca;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.Ingredient;
import com.pillimi.backend.db.entity.Member;

import java.util.List;
import java.util.Optional;

public interface DcaRepositoryCustom {

    Optional<Dca> findByRelationAndAvoid(Ingredient relation, Ingredient avoid);

}
