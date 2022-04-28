package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medical_record")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalRecodeSeq;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column
    private String recordHospital;

    @Column
    private String recordSymptom;

    @Column
    private String recordContent;

    @Column
    private LocalDate recordDate;
}
