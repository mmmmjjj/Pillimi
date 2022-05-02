package com.pillimi.backend.common.model;

public class ResponseMessage {

    // Common
    public static final String SERVER_ERROR =  "서버 에러";
    public static final String UNAUTHORIZED = "인증 되지 않은 유저";
    public static final String FORBIDDEN = "허용하지 않는 접근";
    public static final String NOT_FOUND = "Not Found 오류";
    public static final String INVALID_INPUT = "잘못된 입력 값";

    // Auth
    public static final String GET_KAKAO_ACCESS_TOKEN = "카카오 토큰 생성 성공";

    // Member
    public static final String LOGIN = "로그인 성공";
    public static final String REGISTER = "회원가입 성공";
    public static final String GET_MEMBER_INFO = "회원 정보 조회 성공";
    public static final String UPDATE_MEMBER_INFO = "회원 정보 수정 성공";

    // Search
    public static final String SEARCH = "검색 성공";

    // Medicine
    public static final String GET_MEDICINE_INFO = "약품 상세 정보 조회 성공";

    // Family
    public static final String GET_FAMILY_REQUEST = "가족 요청 목록 조회 성공";
    public static final String ADD_FAMILY = "가족 추가 성공";

}
