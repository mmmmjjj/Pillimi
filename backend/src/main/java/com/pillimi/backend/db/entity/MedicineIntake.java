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
    private Long memberMedicineSeq;

    @Column
    private String memberMedicineName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq")
    private Member memberSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_seq")
    private Medicine medicineSeq;

    @Column
    private boolean memberMedicineNow;

    @Column
    private LocalDate memberMedicineStart;

    @Column
    private LocalDate memberMedicineEnd;

}
