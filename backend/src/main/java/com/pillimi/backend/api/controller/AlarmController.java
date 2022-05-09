package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.service.AlarmService;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.db.entity.AlarmProtege;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "알림 API", tags = "Alarm")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/alarm")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/{alarmSeq}")
    @ApiOperation(value = "복용 인증 약 정보 조회", notes = "사진 찍기를 클릭 시 요청해야 하는 API입니다.\n해당 알림 시간에 복용해야 하는 약 정보를 반환하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_TAKE_ALARM),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getProtegeAlarm(@PathVariable Long alarmSeq){

        AlarmProtege alarm = alarmService.getAlarmProtegeById(alarmSeq).orElseThrow(() -> new NotFoundException(ErrorCode.ALARM_NOT_FOUND));

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_TAKE_ALARM,alarmService.getAlarmProtegeRes(alarm)));
    }


}
