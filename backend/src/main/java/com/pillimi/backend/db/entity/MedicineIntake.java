package com.pillimi.backend.db.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "medicine_intake")
public class MedicineIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineIntakeSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_medicine_seq")
    private MemberMedicine memberMedicine;

    @Column
    private int intakeDay;

    @Column
    private int intakeCount;

    @Column
    private boolean intakeIsconfirm;

    @Column
    private LocalDate intakeStart;

    @Column
    private LocalDate intakeEnd;

}
