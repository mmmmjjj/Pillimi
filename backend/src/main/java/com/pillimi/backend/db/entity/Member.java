package com.pillimi.backend.db.entity;


import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "member")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    @Column
    private String memberUid;

    @Column
    private String memberNickname;

    @Column
    private String memberEmail;

    @Column
    private String memberImage;

    @Column
    private LocalDate memberBirthdate;

    @Column
    private String memberPhone;

    @Column
    private Boolean memberIsdeleted;

    @Column
    private Boolean memberIsfirst;

    @Column
    private int memberIsprotector;

    @Column
    private String memberFcmToken;
}
