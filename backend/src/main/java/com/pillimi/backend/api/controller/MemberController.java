package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.response.LoginRes;
import com.pillimi.backend.api.service.AuthService;
import com.pillimi.backend.api.service.MemberService;
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
                .build();

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, LOGIN, loginRes));
    }

}
