package com.pillimi.backend.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel("FamilyRegistReq")
@Getter
public class FamilyRegistReq {
    @ApiModelProperty(name = "멤버 번호", example = "1")
    private long memberSeq;

    @ApiModelProperty(name = "이름", example = "김OO")
    private String memberName;

    @ApiModelProperty(name = "전화번호", example = "010-0000-0000")
    private String phone;

}
