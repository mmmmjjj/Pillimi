package com.pillimi.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel("UploadReq")
@Getter
public class UploadReq {

    @ApiModelProperty(name = "알림 ID", example = "1")
    private Long alarmSeq;

    @ApiModelProperty(name = "인코딩된 이미지(base64)", example = "인코딩 코드")
    private String image;

}