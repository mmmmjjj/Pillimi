package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@ApiModel("TodayMedicineResponse")
@Getter
@Setter
@AllArgsConstructor
public class TodayListRes {

    @ApiModelProperty(name = "복약 시간", example = "12:00")
    private LocalTime intakeTime;

    @ApiModelProperty(name = "약품 리스트", example = "")
    private List<TodayMedicineRes> medicineList;

    @ApiModelProperty(name = "복용 여부", example = "true")
    private boolean isTaken;

}
