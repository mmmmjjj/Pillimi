package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@ApiModel("MemberMedicineResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProtectorAlarmInfoRes {

    @ApiModelProperty(name = "보호자 알람 번호", example = "1")
    private Long alarmProtectorSeq;

    @ApiModelProperty(name = "보호자 번호", example = "1")
    private Long protectorSeq;

    @ApiModelProperty(name = "피보호자 번호", example = "1")
    private Long protegeSeq;

    @ApiModelProperty(name = "피보호자 이름", example = "김싸피")
    private String protegeName;

    @ApiModelProperty(name = "알람 날짜", example = "2022/04/12")
    private LocalDate alarmDate;

    @ApiModelProperty(name = "알람 시간", example = "19:21")
    private LocalTime alarmTime;

    @ApiModelProperty(name = "복용약 이미지 주소", example = "???")
    private String photoURL;

    @ApiModelProperty(name = "복용약 이름 리스트", example = "[{medicineName:'나제론오디정0.1mg',medicineCount:2},{medicineName:'나제론오디정0.1mg',medicineCount:3}]")
    private List<AlarmMedicineRes> medicineList;


}
