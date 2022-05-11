package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@ApiModel("AlarmProtegeResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class AlarmProtegeRes {

    @ApiModelProperty(name = "회원 닉네임", example = "김싸피")
    private String nickName;

    @ApiModelProperty(name = "복용 약 정보", example = "")
    private List<AlarmMedicineRes> pillList;

}
