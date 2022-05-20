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
@Table(name = "dca")
public class Dca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dcaSeq;

    @Column
    private String dcaName;

    @ManyToOne
    @JoinColumn(name = "relation_seq")
    private Ingredient relation;

    @ManyToOne
    @JoinColumn(name = "avoid_seq")
    private Ingredient avoid;

    @Column
    private String dcaAvoid;

    @Column
    private String dcaAvoidDesc;
}
