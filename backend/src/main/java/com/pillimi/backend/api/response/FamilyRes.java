package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@ApiModel("FamilyResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class FamilyRes {

    @ApiModelProperty(name = "가족 회원 ID", example = "1")
    private Long memberSeq;

    @ApiModelProperty(name = "가족 회원 닉네임", example = "김싸피")
    private String memberName;

    @ApiModelProperty(name = "가족 회원 이미지", example = "http://uri...")
    private String memberImage;

}
