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
@Table(name = "remark")
public class Remark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long remarkSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_medicine_seq")
    private MemberMedicine memberMedicine;

    @Column
    private String remarkContent;

    @Column
    private LocalDate remarkDate;


}
