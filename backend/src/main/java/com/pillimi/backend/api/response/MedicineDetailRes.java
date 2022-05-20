package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@ApiModel("MedicineDetailResponse")
@Getter
@Setter
@AllArgsConstructor
public class MedicineDetailRes {

    @ApiModelProperty(name = "약 이름", example = "타이레놀서방정")
    private String name;

    @ApiModelProperty(name = "제약 회사", example = "(주)대웅제약")
    private String company;

    @ApiModelProperty(name = "약 이미지", example = "이미지 uri")
    private String image;

    @ApiModelProperty(name = "약 효능효과", example = "이 약은 티눈, 못(굳은살), 사마귀에 사용합니다.")
    private String effect;

    @ApiModelProperty(name = "약 주의사항", example = "혈압이 오르며 두통 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오.")
    private String caution;

    @ApiModelProperty(name = "약 복용방법", example = "15세 이상 및 성인은 1회 1병, 1일 1~2회 복용합니다.")
    private String dosage;

    @ApiModelProperty(name = "약 유통기한", example = "제조일로부터 36 개월")
    private String validity;

    @ApiModelProperty(name = "약 보관방법", example = "기밀용기, 실온보관(1 ~ 30℃)")
    private String store;


}
