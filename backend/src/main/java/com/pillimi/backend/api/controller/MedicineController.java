package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.service.MedicineService;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "약 API", tags = "Medicine")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/medicine/")
public class MedicineController {

    private final MedicineService medicineService;

    @ApiOperation(value = "약품 상세 조회", notes = "약품 상세 정보 조회 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_MEDICINE_INFO),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "{medicineSeq}")
    public ResponseEntity<BaseResponseBody> getMedicineInfo(@PathVariable Long medicineSeq) {

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_MEDICINE_INFO,medicineService.getMedicineInfo(medicineSeq)));
    }
}
