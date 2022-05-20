package com.pillimi.backend.api.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@ApiModel("SearchResponse")
@Getter
@Setter
@AllArgsConstructor
public class SearchRes {

    @ApiModelProperty(name = "약 ID", example = "1")
    private Long medicineSeq;

    @ApiModelProperty(name = "약 이름", example = "타이레놀서방정")
    private String medicineName;

    @ApiModelProperty(name = "약 이미지", example = "이미지 uri")
    private String medicineImage;

}
