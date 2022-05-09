package com.pillimi.backend.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "alarm_protector")
public class AlarmProtector extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmSeq;

    private String alarmPhoto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protector_seq")
    private Member protector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alarm_protege_seq")
    private AlarmProtege alarmProtege;
}
