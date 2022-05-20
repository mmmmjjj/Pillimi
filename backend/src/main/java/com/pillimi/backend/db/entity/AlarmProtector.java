package com.pillimi.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "alarm_protector")
public class AlarmProtector extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmSeq;

    @Column
    private String alarmPhoto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protector_seq")
    private Member protector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alarm_protege_seq")
    private AlarmProtege alarmProtege;

    @Column
    private int medicineCountDetected;

}
