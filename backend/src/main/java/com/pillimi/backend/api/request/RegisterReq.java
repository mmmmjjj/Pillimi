package com.pillimi.backend.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;

@ApiModel("RegisterReq")
@Getter
public class RegisterReq {

    @ApiModelProperty(name = "생년월일", example = "1990-01-10")
    private LocalDate birthDate;

    @ApiModelProperty(name = "전화번호", example = "010-1111-1111")
    private String phone;

    @ApiModelProperty(name = "보호자 여부", example = "보호자일 시 1, 아닐 시 0")
    private int isProtector;

}
