package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Daa;
import com.pillimi.backend.db.entity.Dca;
import com.pillimi.backend.db.entity.Dea;
import com.pillimi.backend.db.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeaRepository extends JpaRepository<Dea, Long> {
    Optional<Dea> findByIngredient(Ingredient ingredient);

    List<Dea> findByDeaName(String deaName);
}
