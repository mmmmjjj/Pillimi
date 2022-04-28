package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "medicine_ingredient")
public class MedicineIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineIngredientSeq;

    @ManyToOne
    @JoinColumn(name = "medicine_seq")
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "ingredient_seq")
    private Ingredient ingredient;

    @Column
    private int ingredientType;
}
