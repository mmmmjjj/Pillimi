//package com.pillimi.backend.db.entity;
//
//
//import lombok.*;
//import org.hibernate.annotations.DynamicInsert;
//import org.hibernate.annotations.DynamicUpdate;
//
//import javax.persistence.*;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@DynamicInsert
//@DynamicUpdate
//@Entity
//@Table(name = "intake_time")
//public class IntakeTime {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long intakeTimeSeq;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "medicine_intake_seq")
//    private MedicineIntake medicineIntake;
//
//    @Column
//    private double intakeTime;
//
//}
