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
@Table(name = "shape")
public class Shape{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineSeq;

    @Column
    private String shapeImage;

    @Column
    private String shapeFrontMark;

    @Column
    private String shapeBackMark;

    @Column
    private String shapeShape;

    @Column
    private String shapeFrontColor;

    @Column
    private String shapeBackColor;


}
