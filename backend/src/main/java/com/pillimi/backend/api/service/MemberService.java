package com.pillimi.backend.api.service;

import com.pillimi.backend.common.model.KakaoProfile;
import com.pillimi.backend.common.model.RoleType;
import com.pillimi.backend.db.entity.Member;

import java.util.Optional;

public interface MemberService {

    Member createMember(Member member);

    Optional<Member> getMemberById(Long id);

    Optional<Member> getMemberByUid(String uid);

    Member createKakaoMember(KakaoProfile kakaoProfile);

    String createToken(Long id, RoleType roleType);

}
