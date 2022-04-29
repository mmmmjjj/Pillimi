package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.service.FamilyService;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.db.entity.FamilyRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "가족 API", tags = "Family")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/famaily")
public class FamilyController {

    private final FamilyService familyService;

    @PostMapping("/regist/protector")
    @ApiOperation(value = "가족등록 요청", notes = "보호자가 가족등록을 하는 api")
    @ApiResponses({
//            @ApiResponse(code = 200, message = REGISTER),
//            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
//            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
//            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
//            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
            @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<FamilyRequest> regist(@RequestBody FamilyRegistReq req){
        familyService.createFamily(req);
        return ResponseEntity.status(200).body(familyService.createFamily(req));
        //return ResponseEntity.status(200).body("Success");
        //return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, REGISTER,familyService.createFamily(req)));
    }
}
