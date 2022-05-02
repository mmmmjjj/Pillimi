package com.pillimi.backend.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@ApiModel("MemberMedicineUpdateReq")
@Getter
public class MemberMedicineUpdateReq {

    @ApiModelProperty(name = "맴버약품 번호", example = "1")
    private Long memberMedicineSeq;

    @ApiModelProperty(name = "맴버 번호", example = "1")
    private Long memberSeq;

    @ApiModelProperty(name = "약품 번호", example = "1")
    private Long medicineSeq;

    @ApiModelProperty(name = "약 별칭", example = "혈압약")
    private String memberMedicineName;

    @ApiModelProperty(name = "복용 시작 일자", example = "1990-01-10")
    private LocalDate startDay;

    @ApiModelProperty(name = "복용 종료 일자", example = "1990-01-10")
    private LocalDate endDay;

    @ApiModelProperty(name = "복용 주기", example = "3")
    private int intakeDay;

    @ApiModelProperty(name = "복약 시간", example = "[9.5,10.5]")
    private List<Double> intakeTime;

    @ApiModelProperty(name = "복약 갯수", example = "2")
    private int intakeCount;

    @ApiModelProperty(name = "섭취 후 특이사항", example = "나른함")
    private String remarkContent;

}
