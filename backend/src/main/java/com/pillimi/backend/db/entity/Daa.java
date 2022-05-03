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

    @Column
    private Long daaAge;

    @Column
    private String daaDesc;

}
