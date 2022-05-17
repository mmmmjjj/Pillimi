package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@ApiModel("MemberMedicineResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProtectorAlarmRes {

    @ApiModelProperty(name = "보호자 알람 번호", example = "1")
    private Long alarmProtectorSeq;

    @ApiModelProperty(name = "피보호자 이름", example = "김싸피")
    private String protegeName;

    @ApiModelProperty(name = "알람 날짜", example = "2022/04/12")
    private LocalDate alarmDate;

    @ApiModelProperty(name = "알람 시간", example = "19:21")
    private LocalTime alarmTime;

    @ApiModelProperty(name = "실제 복용 시간", example = "2022-05-13T23:31:49")
    private LocalDateTime takeTime;

    @ApiModelProperty(name = "복용약 이미지 주소", example = "???")
    private String photoURL;

    @ApiModelProperty(name = "복용약 이미지 인식 알약 갯수", example = "1")
    private int medicineCountDetected;
}
