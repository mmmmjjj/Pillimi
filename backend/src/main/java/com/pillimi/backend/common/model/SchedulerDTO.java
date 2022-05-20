package com.pillimi.backend.common.model;

import com.pillimi.backend.db.entity.Member;
import lombok.*;

import java.time.LocalTime;

@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SchedulerDTO {

    Member member;

    LocalTime time;

    int count;
}
