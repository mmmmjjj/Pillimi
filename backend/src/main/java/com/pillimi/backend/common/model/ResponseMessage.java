package com.pillimi.backend.common.model;

public class ResponseMessage {

    // Common
    public static final String SERVER_ERROR =  "서버 에러";
    public static final String UNAUTHORIZED = "인증 되지 않은 유저";
    public static final String FORBIDDEN = "허용하지 않는 접근";
    public static final String NOT_FOUND = "Not Found 오류";

    // Auth
    public static final String GET_KAKAO_ACCESS_TOKEN = "카카오 토큰 생성 성공";

    // Member
    public static final String LOGIN = "로그인 성공";
    public static final String REGISTER = "회원가입 성공";
    public static final String GET_MEMBER_INFO = "회원 정보 조회 성공";
}
