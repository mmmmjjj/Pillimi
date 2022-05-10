package com.pillimi.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "alarm_protege")
public class AlarmProtege extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmSeq;

    @Column
    private LocalDate alarmDate;

    @Column
    private LocalTime alarmTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protege_seq")
    private Member protege;

}
