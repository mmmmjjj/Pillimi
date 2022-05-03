package com.pillimi.backend.db.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
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
