package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.RegisterReq;
import com.pillimi.backend.api.request.UpdateMemberReq;
import com.pillimi.backend.api.response.MemberInfoRes;
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

    void registerInfo(Member member, RegisterReq req);

    MemberInfoRes getMemberInfo(Member member);

    void updateInfo(Member member, UpdateMemberReq req);

    void updateFcmToken(Member member,String token);

}
