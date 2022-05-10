package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@ApiModel("AlarmMedicineResponse")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class AlarmMedicineRes {

    @ApiModelProperty(name = "약품 이름", example = "타이레놀")
    private String medicineName;

    @ApiModelProperty(name = "약 별칭", example = "혈압약")
    private String memberMedicineName;

    @ApiModelProperty(name = "약 이미지 주소", example = "???")
    private String imageURL;

    @ApiModelProperty(name = "복약 갯수", example = "1")
    private int count;

}
