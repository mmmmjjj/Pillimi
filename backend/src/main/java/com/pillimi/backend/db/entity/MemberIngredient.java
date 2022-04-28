package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "member_ingredient")
public class MemberIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberIngredientSeq;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "medicine_ingredient_seq")
    private MemberIngredient memberIngredient;
}
