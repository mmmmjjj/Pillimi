package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.MemberMedicineCreateReq;
import com.pillimi.backend.api.request.MemberMedicineUpdateReq;
import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.api.service.MemberMedicineService;
import com.pillimi.backend.api.service.MemberService;
import com.pillimi.backend.common.auth.JwtUtil;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.MemberMedicine;
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

@Api(value = "회원 API", tags = "Member")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member/medicine/")
public class MemberMedicineController {

    private final MemberService memberService;

    private final MemberMedicineService memberMedicineService;


    @ApiOperation(value = "사용자 복용 약품 등록", notes = "사용자 복용 약품 등록 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = REGIST_MEMBER_MEDICINE),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PostMapping(value = "")
    public ResponseEntity<BaseResponseBody> createMemberMedicineInfo(@RequestBody MemberMedicineCreateReq req) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        memberMedicineService.createMemberMedicine(req);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, REGIST_MEMBER_MEDICINE));
    }

    @ApiOperation(value = "사용자 복용 약품 수정", notes = "사용자 복용 약품 수정 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = UPDATE_MEMBER_MEDICINE),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PutMapping(value = "")
    public ResponseEntity<BaseResponseBody> updateMemberMedicineInfo(@RequestBody MemberMedicineUpdateReq req) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        memberMedicineService.updateMemberMedicine(req);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, UPDATE_MEMBER_MEDICINE));
    }

    @ApiOperation(value = "사용자 복용 약품 삭제", notes = "사용자 복용 약품 삭제 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = DELETE_MEMBER_MEDICINE),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @DeleteMapping(value = "")
    public ResponseEntity<BaseResponseBody> deleteMemberMedicineInfo(@RequestParam Long memberMedicineSeq) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        memberMedicineService.deleteMemberMedicine(memberMedicineSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, DELETE_MEMBER_MEDICINE));
    }

    @ApiOperation(value = "사용자 복용 약품 목록", notes = "사용자 복용 약품 목록 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = SELECT_MEMBER_MEDICINE),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "")
    public ResponseEntity<BaseResponseBody> getMemberMedicineInfo(@RequestParam Long memberSeq) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        List<MemberMedicineRes> memberMedicines = memberMedicineService.getMemberMedicine(memberSeq);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, SELECT_MEMBER_MEDICINE, memberMedicines));
    }



}
