package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@ApiModel("MedicineDetailResponse")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class MedicineInfoRes {

    @ApiModelProperty(name = "약 상세 정보", example = "")
    MedicineDetailRes medicineDetail;

    @ApiModelProperty(name = "약 성분 리스트", example = "시티콜린, 식염수, 수산화나트륨 ...")
    private List<String> ingredientList;
}
