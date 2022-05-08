package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "alarm")
public class Alarm extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmSeq;

    @Column
    private LocalDate alarmDate;

    @Column
    private String alarmPhoto;

    @Column
    private LocalTime alarmTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_seq")
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_seq")
    private Member receiver;

}
