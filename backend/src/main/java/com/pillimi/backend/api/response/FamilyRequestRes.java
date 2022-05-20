package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@ApiModel("FamilyRequestResponse")
@Getter
@Setter
@AllArgsConstructor
public class FamilyRequestRes {

    @ApiModelProperty(name = "가족요청 ID", example = "1")
    private Long familyRequestSeq;

    @ApiModelProperty(name = "요청자 닉네임", example = "김싸피")
    private String requestName;

    @ApiModelProperty(name = "요청자 번호", example = "010-1111-1111")
    private String requestPhone;

    @ApiModelProperty(name = "요청자 프로필 사진 URI", example = "http://...")
    private String requestImage;

}
