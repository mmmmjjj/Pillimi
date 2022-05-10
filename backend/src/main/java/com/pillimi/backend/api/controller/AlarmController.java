package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.UploadReq;

import com.pillimi.backend.api.response.ProtectorAlarmInfoRes;
import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.api.service.AlarmService;
import com.pillimi.backend.api.service.MemberService;
import com.pillimi.backend.common.auth.JwtUtil;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.db.entity.AlarmProtege;
import com.pillimi.backend.db.entity.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "알림 API", tags = "Alarm")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/alarm")
public class AlarmController {

    private final MemberService memberService;
    
    private final AlarmService alarmService;

    @GetMapping("/protege/{alarmSeq}")
    @ApiOperation(value = "복용 인증 약 정보 조회", notes = "사진 찍기를 클릭 시 요청해야 하는 API입니다.\n해당 알림 시간에 복용해야 하는 약 정보를 반환하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_TAKE_ALARM),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtegeAlarmList(@PathVariable Long alarmSeq) {

        AlarmProtege alarm = alarmService.getAlarmProtegeById(alarmSeq).orElseThrow(() -> new NotFoundException(ErrorCode.ALARM_NOT_FOUND));

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_TAKE_ALARM, alarmService.getAlarmProtegeRes(alarm)));
    }

    @PostMapping("/protege")
    @ApiOperation(value = "복용 인증", notes = "사진을 전송하고 복용 인증 하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = POST_TAKE),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> uploadTaking(@RequestBody UploadReq req) {

        alarmService.uploadTaking(req);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, POST_TAKE));
    }


    @GetMapping("/protector")
    @ApiOperation(value = "보호자 알람 목록 확인", notes = "보호자가 받은 피보호자의 약물 섭취 목록을 반환하는 API합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_PROTECTOR_ALARM),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtectorAlarmList(@RequestParam Long protegeSeq){

        Member protector = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        Member protege = memberService.getMemberById(protegeSeq).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        List<ProtectorAlarmRes> protectorAlarmRes = alarmService.getAlarmProtectorList(protector, protege);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_PROTECTOR_ALARM, protectorAlarmRes));
    }

    @GetMapping("/protector/{alarmSeq}")
    @ApiOperation(value = "보호자 알람 상세 확인", notes = "보호자가 받은 피보호자의 약물 섭취 알람의 상세정보를 반환하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_PROTECTOR_ALARM_INFO),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtectorAlarmInfo(@PathVariable Long alarmSeq){

        ProtectorAlarmInfoRes protectorAlarmInfoRes = alarmService.getAlarmInfo(alarmSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_PROTECTOR_ALARM_INFO, protectorAlarmInfoRes));
    }

    @DeleteMapping("/protector/{alarmSeq}")
    @ApiOperation(value = "보호자 알람 삭제", notes = "보호자가 확인한 피보호자의 약물 섭취 알람을 삭제하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = DELETE_PROTECTOR_ALARM_INFO),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> deleteProtectorAlarmInfo(@PathVariable Long alarmSeq){

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        alarmService.deleteAlarmInfo(alarmSeq);

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, DELETE_PROTECTOR_ALARM_INFO));
    }



}
