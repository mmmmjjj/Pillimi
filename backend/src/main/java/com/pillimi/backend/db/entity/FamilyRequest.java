package com.pillimi.backend.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="family_request")
public class FamilyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long familyRequestSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protector_seq")
    private Member requestProtector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "protege_seq")
    private Member requestProtege;

}
