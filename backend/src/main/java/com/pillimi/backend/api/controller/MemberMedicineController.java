package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.MemberMedicineReq;
import com.pillimi.backend.api.request.RegisterReq;
import com.pillimi.backend.api.request.UpdateMemberReq;
import com.pillimi.backend.api.response.LoginRes;
import com.pillimi.backend.api.service.AuthService;
import com.pillimi.backend.api.service.MemberMedicineService;
import com.pillimi.backend.api.service.MemberService;
import com.pillimi.backend.common.auth.JwtUtil;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import com.pillimi.backend.common.model.KakaoProfile;
import com.pillimi.backend.common.model.RoleType;
import com.pillimi.backend.db.entity.Member;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

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
            @ApiResponse(code = 200, message = UPDATE_MEMBER_INFO),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PutMapping(value = "")
    public ResponseEntity<BaseResponseBody> createMemberMedicineInfo(@RequestBody MemberMedicineReq req) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        memberMedicineService.createMemberMedicine(member,req);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, UPDATE_MEMBER_INFO));
    }

}
