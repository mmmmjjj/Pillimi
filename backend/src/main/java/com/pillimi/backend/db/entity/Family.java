package com.pillimi.backend.db.entity;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "family")
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long familySeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protector_seq")
    private Member protector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protege_seq")
    private Member protege;


}
