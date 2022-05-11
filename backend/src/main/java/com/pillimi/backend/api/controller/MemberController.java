package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.request.RegisterReq;
import com.pillimi.backend.api.request.UpdateMemberReq;
import com.pillimi.backend.api.response.LoginRes;
import com.pillimi.backend.api.service.AuthService;
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
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "회원 API", tags = "Member")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final AuthService authService;
    private final MemberService memberService;

    @ApiOperation(value = "카카오 토큰 요청", notes = "카카오 인가 코드로 액세스 토큰을 요청하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_KAKAO_ACCESS_TOKEN),
    @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "/kakao/token")
    public ResponseEntity<BaseResponseBody> requestKakaoToken(@RequestParam String code) {
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, GET_KAKAO_ACCESS_TOKEN, authService.getKakaoAccessToken(code)));
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 액세스 토큰으로 유저 정보를 받아 jwt 토큰을 발급하고 전송하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = LOGIN, response = LoginRes.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "/kakao/login")
    public ResponseEntity<BaseResponseBody> login(@RequestParam String accessToken) {
        // 1. access token으로 유저 정보 받아오기
        KakaoProfile kakaoProfile = authService.getKakaoMemberInfo(accessToken);
        System.out.println(kakaoProfile.toString());

        // 2. DB에서 카카오회원번호로 회원 정보 불러오기
        String uid = Long.toString(kakaoProfile.getId());

        Member member = memberService.getMemberByUid(uid).orElse(null);

        // 3. 없으면 DB에 저장
        if (member == null)
            member = memberService.createKakaoMember(kakaoProfile);

        // 4. JWT token 발급
        String token = memberService.createToken(member.getMemberSeq(), RoleType.MEMBER);

        LoginRes loginRes = LoginRes.builder().memberSeq(member.getMemberSeq())
                .accessToken(token)
                .nickName(member.getMemberNickname())
                .memberImage(member.getMemberImage())
                .isFirst(member.getMemberIsfirst())
                .isProtector(member.getMemberIsprotector() == 1)
                .build();

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, LOGIN, loginRes));
    }

    @ApiOperation(value = "초기정보 입력", notes = "첫 로그인 후 회원 정보를 입력받는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = REGISTER),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PostMapping(value = "/register")
    public ResponseEntity<BaseResponseBody> registerInfo(@RequestBody RegisterReq req) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        if (!member.getMemberIsfirst()) throw new AccessDeniedException(ErrorCode.ALREADY_REGISTERED.getMessage());

        memberService.registerInfo(member, req);

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, REGISTER));
    }

    @ApiOperation(value = "회원정보 조회", notes = "회원 정보 조회 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = GET_MEMBER_INFO),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "")
    public ResponseEntity<BaseResponseBody> getMemberInfo(@RequestParam Long memberSeq) {

        Member member = memberService.getMemberById(memberSeq).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, GET_MEMBER_INFO,memberService.getMemberInfo(member)));
    }

    @ApiOperation(value = "회원정보 수정", notes = "회원 정보 수정 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = UPDATE_MEMBER_INFO),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 403, message = FORBIDDEN, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PutMapping(value = "")
    public ResponseEntity<BaseResponseBody> updateMemberInfo(@RequestBody UpdateMemberReq req) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        memberService.updateInfo(member,req);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, UPDATE_MEMBER_INFO));
    }

    @ApiOperation(value = "FCM 토큰 등록", notes = "로그인한 기기의 FCM 토큰을 회원 정보에 등록하는 API입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = UPDATE_FCM_TOKEN),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 404, message = NOT_FOUND, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @PostMapping(value = "/fcm")
    public ResponseEntity<BaseResponseBody> updateFcmToken(@RequestParam String fcmToken) {

        Member member = memberService.getMemberById(JwtUtil.getCurrentId()).orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        memberService.updateFcmToken(member,fcmToken);
        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.OK, UPDATE_FCM_TOKEN));
    }

}
