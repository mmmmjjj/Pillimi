package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.api.response.FamilyRes;
import com.pillimi.backend.common.exception.InvalidException;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.FamilyRepository;
import com.pillimi.backend.db.repository.FamilyRequestRepository;
import com.pillimi.backend.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;

import java.util.Optional;
import java.util.List;

import static com.pillimi.backend.common.exception.handler.ErrorCode.*;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FamilyServiceImpl implements FamilyService {
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final FamilyRequestRepository familyRequestRepository;
    private final FirebaseMessageService firebaseMessageService;


    /*
    가족 요청
     */
    @Override
    public void createFamily(Member protector, FamilyRegistReq req) {
        Member protege = memberRepository.findByMemberPhoneAndMemberNickname(req.getMemberPhone(), req.getMemberName())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND)); //피보호자 멤버정보

        if(protege.getMemberIsprotector()==1)
            throw new InvalidException(INVALID_INPUT_VALUE);

        if(checkFamily(protector, protege).isPresent()
                || familyRequestRepository.findByRequestProtectorAndRequestProtege(protector,protege).isPresent())
            throw new InvalidException(ALREADY_FAMILY);


        FamilyRequest familyrequest = FamilyRequest.builder()
                .requestProtector(protector)
                .requestProtege(protege)
                .build();

        familyRequestRepository.save(familyrequest);

        // 피보호자에게 알림 보내기
        String token = protege.getMemberFcmToken();
        String title = "가족 요청 알림";
        String body = protector.getMemberNickname() + "님의 가족 요청입니다.";
        String url = "https://pillimi.com/family/myfamily";
        try {
            firebaseMessageService.sendMessageWithoutImage(token,title,body,url);
        } catch (IOException e) {
            log.info(protege.getMemberNickname()+" 님에게 알림 전송을 실패하였습니다.");
        }
    }

    /*
    가족 목록 조회
     */
    @Override
    public List<FamilyRes> getFamilyList(Member member) {
        List<Member> list = familyRepository.findFamilyByMember(member);
        List<FamilyRes> res = new ArrayList<>();

        for (Member m : list) {
            res.add(FamilyRes.builder()
                    .memberSeq(m.getMemberSeq())
                    .memberName(m.getMemberNickname())
                    .memberImage(m.getMemberImage()).build());
        }

        return res;
    }


    @Override
    public void deleteFamily(Member member, Member protege) {
        familyRepository.deleteByProtectorAndProtege(member,protege);
    }

    /*
    가족 요청 목록 조회
     */
    @Override
    public List<FamilyRequestRes> getFamilyRequestList(Member member) {

        return familyRequestRepository.findFamilyRequestByMember(member);
    }

    /*
    가족 요청 승인 및 가족 추가
     */
    @Override
    public void addFamily(Member member, Long familyRequestSeq) {
        FamilyRequest request = familyRequestRepository.findById(familyRequestSeq).orElseThrow(() -> new NotFoundException(ErrorCode.FAMILY_REQUEST_NOT_FOUND));

        if (!member.equals(request.getRequestProtege()))
            throw new AccessDeniedException(ErrorCode.ACCESS_DENIED.getMessage());

        Family family = Family.builder()
                .protector(request.getRequestProtector())
                .protege(request.getRequestProtege())
                .build();

        familyRepository.save(family);
        familyRequestRepository.delete(request);

        // 보호자에게 알림 보내기
        String token = request.getRequestProtector().getMemberFcmToken();
        String title = "가족 등록 알림";
        String body = request.getRequestProtege().getMemberNickname() + "님이 가족 요청을 수락하였습니다.";
        String url = "https://pillimi.com/family/Protector";
        try {
            firebaseMessageService.sendMessageWithoutImage(token,title,body,url);
        } catch (IOException e) {
            log.info(request.getRequestProtege().getMemberNickname()+" 님에게 알림 전송을 실패하였습니다.");
        }

    }

    /*
    가족 요청 거절 및 가족 요청 삭제
     */
    @Override
    public void rejectFamilyRequest(Member member, Long familyRequestSeq) {
        FamilyRequest request = familyRequestRepository.findById(familyRequestSeq).orElseThrow(() -> new NotFoundException(ErrorCode.FAMILY_REQUEST_NOT_FOUND));

        if (!member.equals(request.getRequestProtege()))
            throw new AccessDeniedException(ErrorCode.ACCESS_DENIED.getMessage());

        familyRequestRepository.delete(request);

        // 보호자에게 알림 보내기
        String token = request.getRequestProtector().getMemberFcmToken();
        String title = "가족 등록 알림";
        String body = request.getRequestProtege().getMemberNickname() + "님이 가족 요청을 거절하였습니다.";
        String url = "https://pillimi.com/family/Protector";
        try {
            firebaseMessageService.sendMessageWithoutImage(token,title,body,url);
        } catch (IOException e) {
            log.info(request.getRequestProtege().getMemberNickname()+" 님에게 알림 전송을 실패하였습니다.");
        }

    }

    @Override
    public Optional<Family> checkFamily(Member protector, Member protege) {

        return familyRepository.findFamilyByProtectorAndProtege(protector, protege);
    }

}
