package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@ApiModel("KakaoLoginResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginRes {

    @ApiModelProperty(name = "회원 ID", example = "1")
    private Long memberSeq;

    @ApiModelProperty(name = "액세스 토큰", example = "JWT token 값")
    private String accessToken;

    // TODO refreshToken 추가

    @ApiModelProperty(name = "회원 닉네임", example = "김싸피")
    private String nickName;

    @ApiModelProperty(name = "회원 프로필 사진 URI", example = "http//uri...")
    private String memberImage;

    @ApiModelProperty(name = "신규 회원 여부", example = "true")
    private boolean isFirst;
}
