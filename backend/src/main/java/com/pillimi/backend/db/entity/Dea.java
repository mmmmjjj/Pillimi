package com.pillimi.backend.db.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "dea")
public class Dea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deaSeq;

    @Column
    private String deaName;

    @Column
    private String deaEffectName;

    @ManyToOne
    @JoinColumn(name = "ingredient_seq")
    private Ingredient ingredient;
}
