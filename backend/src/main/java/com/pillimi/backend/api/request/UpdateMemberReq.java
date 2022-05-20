package com.pillimi.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;

@ApiModel("UpdateMemberReq")
@Getter
public class UpdateMemberReq {

    @ApiModelProperty(name = "회원 ID", example = "1")
    private Long memberSeq;

    @ApiModelProperty(name = "회원 닉네임", example = "김싸피")
    private String nickName;

    @ApiModelProperty(name = "생년월일", example = "1990-01-10")
    private LocalDate birthDate;

    @ApiModelProperty(name = "전화번호", example = "010-1111-1111")
    private String phone;

}
