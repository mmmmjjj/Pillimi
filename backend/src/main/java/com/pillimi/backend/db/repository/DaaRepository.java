package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Daa;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DaaRepository extends JpaRepository<Daa, Long> {
    Optional<Daa> findByIngredient(Ingredient ingredient);
}
