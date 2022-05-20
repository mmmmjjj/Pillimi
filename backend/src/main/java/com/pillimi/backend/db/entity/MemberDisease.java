package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "member_disease")
public class MemberDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberDiseaseSeq;

    @ManyToOne
    @JoinColumn(name = "disease_seq")
    private Disease disease;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;
}
