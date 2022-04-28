package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@ApiModel("MemberInfoResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class MemberInfoRes {

    @ApiModelProperty(name = "회원 ID", example = "1")
    private Long memberSeq;

    @ApiModelProperty(name = "회원 닉네임", example = "김싸피")
    private String nickName;

    @ApiModelProperty(name = "회원 프로필 사진 URI", example = "http//uri...")
    private String memberImage;

    @ApiModelProperty(name = "생년월일", example = "1990-01-10")
    private LocalDate birthDate;

    @ApiModelProperty(name = "전화번호", example = "010-1111-1111")
    private String phone;

    //TODO 기저질환 추가
}
