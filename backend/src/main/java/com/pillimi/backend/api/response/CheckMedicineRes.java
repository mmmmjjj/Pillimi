package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@ApiModel("KakaoLoginResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CheckMedicineRes {

    @ApiModelProperty(name = "금기 타입", example = "1")
    private int checkType;

    @ApiModelProperty(name = "금기 설명", example = "~약물은 ~금기에 해당합니다.")
    private String checkDesc;
    
}
