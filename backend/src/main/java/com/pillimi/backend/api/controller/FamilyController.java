package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.service.FamilyService;
import com.pillimi.backend.api.service.MemberService;
import com.pillimi.backend.common.auth.JwtUtil;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.db.entity.Member;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "가족 API", tags = "Family")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/family")
public class FamilyController {

    private final FamilyService familyService;
    private final MemberService memberService;

    @PostMapping("/request")
    @ApiOperation(value = "가족등록 요청", notes = "보호자가 가족등록을 하는 api")
    @ApiResponses({
            @ApiResponse(code = 200, message = POST_FAMILY_REQUEST),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> requestFamily(@RequestBody FamilyRegistReq req){

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        familyService.createFamily(req);

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, POST_FAMILY_REQUEST));
    }

    @GetMapping("")
    @ApiOperation(value = "등록된 가족 목록 조회", notes = "등록된 가족 목록을 조회하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_FAMILY),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<BaseResponseBody> getFamily(){

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_FAMILY, familyService.getFamilyList(member)));
    }

    @DeleteMapping("")
    @ApiOperation(value = "등록된 가족 삭제 페이지", notes = "가족 삭제하는 api")
    @ApiResponses({
            @ApiResponse(code = 200, message = SEARCH),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class),
    })
    public ResponseEntity<Long> deleteFamily(@RequestParam long familySeq){
        return ResponseEntity.status(200).body(familyService.delete(familySeq));
    }

    @ApiOperation(value = "가족 요청 목록 조회", notes = "피보호자의 가족 요청 목록 조회 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_FAMILY_REQUEST),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "/request")
    public ResponseEntity<BaseResponseBody> getFamilyRequest() {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_FAMILY_REQUEST, familyService.getFamilyRequestList(member)));
    }

    @ApiOperation(value = "가족 추가 (가족 요청 승인)", notes = "피보호자가 가족 요청을 승인하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = ADD_FAMILY),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PostMapping(value = "/add")
    public ResponseEntity<BaseResponseBody> addFamily(@RequestParam Long familyRequestSeq) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        familyService.addFamily(member,familyRequestSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, ADD_FAMILY));
    }

    @ApiOperation(value = "가족 요청 거절", notes = "피보호자가 가족 요청을 거절하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = REJECT_FAMILY_REQUEST),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @DeleteMapping(value = "/request")
    public ResponseEntity<BaseResponseBody> deleteFamilyRequest(@RequestParam Long familyRequestSeq) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        familyService.rejectFamilyRequest(member,familyRequestSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, REJECT_FAMILY_REQUEST));
    }
}
