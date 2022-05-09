package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.response.MedicineDto;
import com.pillimi.backend.api.response.ProtectorAlarmInfoRes;
import com.pillimi.backend.api.response.ProtectorAlarmRes;
import com.pillimi.backend.api.service.AlarmService;
import com.pillimi.backend.api.service.MemberService;
import com.pillimi.backend.common.auth.JwtUtil;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
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
@RequestMapping("/api/v1/Alarm")
public class AlarmController {

    private final MemberService memberService;

    private final AlarmService alarmService;

    @GetMapping("/protector")
    @ApiOperation(value = "보호자 알람 목록 확인", notes = "보호자가 받은 피보호자의 약물 섭취 목록을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_ALARM),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtectorAlarmList(){

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        List<ProtectorAlarmRes> protectorAlarmRes = alarmService.getList(member);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_ALARM, protectorAlarmRes));
    }

    @GetMapping("/protector/{alarmSeq}")
    @ApiOperation(value = "보호자 알람 상세 확인", notes = "보호자가 받은 피보호자의 약물 섭취 알람의 상세정보를 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_ALARM_INFO),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtectorAlarmInfo(@PathVariable Long alarmSeq){

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        ProtectorAlarmInfoRes protectorAlarmInfoRes = alarmService.getAlarmInfo(alarmSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_ALARM, protectorAlarmRes));
    }



}
