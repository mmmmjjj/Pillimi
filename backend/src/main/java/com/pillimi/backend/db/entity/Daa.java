package com.pillimi.backend.db.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "daa")
public class Daa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long daaSeq;

    @Column
    private String daaName;

    @ManyToOne
    @JoinColumn(name = "ingredient_seq")
    private Ingredient ingredient;
}
