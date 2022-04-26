package com.pillimi.backend.api.service;

import com.pillimi.backend.common.model.KakaoProfile;

public interface AuthService {
    String getKakaoAccessToken(String code);

    KakaoProfile getKakaoMemberInfo(String accessToken);
}
