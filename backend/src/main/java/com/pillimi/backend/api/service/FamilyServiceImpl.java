package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.api.response.FamilyRequestRes;
import com.pillimi.backend.common.auth.JwtTokenProvider;
import com.pillimi.backend.common.exception.NotFoundException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.FamilyRepository;
import com.pillimi.backend.db.repository.FamilyRequestRepository;
import com.pillimi.backend.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FamilyServiceImpl implements FamilyService{
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final FamilyRequestRepository familyRequestRepository;
    private final FamilyRepository familyRepository;

    @Override  //보호자가 피보호자 가족 등록하는 상황
    public void createFamily(FamilyRegistReq req) {
        FamilyRequest familyrequest = new FamilyRequest();
        Member protegeName = memberRepository.findByMemberPhone(req.getPhone()); //피보호자 멤버정보
        Member protectorId = memberRepository.getById(req.getMemberSeq()); //보호자 아이디
        if(protegeName.getMemberPhone().equals(req.getPhone())) {
            familyrequest.setRequestProtege(protegeName);
            familyrequest.setRequestProtector(protectorId);
        }
        familyRequestRepository.save(familyrequest);
    }

    @Override
    public List<Family> findAll() {
        List<Family> familys = familyRepository.findAll();
        return familys;
    }

    @Override
    public long delete(long familySeq) {
        long delete = familyRepository.deleteByFamilySeq(familySeq);
        return delete;
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

        if(!member.equals(request.getRequestProtege())) throw new AccessDeniedException(ErrorCode.ACCESS_DENIED.getMessage());

        Family family = Family.builder()
                .protector(request.getRequestProtector())
                .protege(request.getRequestProtege())
                .build();

        familyRepository.save(family);
        familyRequestRepository.delete(request);
    }

    /*
    가족 요청 거절 및 가족 요청 삭제
     */
    @Override
    public void rejectFamilyRequest(Member member, Long familyRequestSeq) {
        FamilyRequest request = familyRequestRepository.findById(familyRequestSeq).orElseThrow(() -> new NotFoundException(ErrorCode.FAMILY_REQUEST_NOT_FOUND));

        if(!member.equals(request.getRequestProtege())) throw new AccessDeniedException(ErrorCode.ACCESS_DENIED.getMessage());

        familyRequestRepository.delete(request);
    }

}
