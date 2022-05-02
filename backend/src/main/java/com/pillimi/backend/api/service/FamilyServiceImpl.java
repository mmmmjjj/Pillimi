package com.pillimi.backend.api.service;

import com.pillimi.backend.api.request.FamilyRegistReq;
import com.pillimi.backend.common.auth.JwtTokenProvider;
import com.pillimi.backend.db.entity.Family;
import com.pillimi.backend.db.entity.FamilyRequest;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.repository.FamilyRepository;
import com.pillimi.backend.db.repository.FamilyRequestRepository;
import com.pillimi.backend.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class FamilyServiceImpl implements FamilyService{
    private final JwtTokenProvider tokenProvider;
    private final MemberRepository memberRepository;
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

    @Override
    public Optional<Family> checkFamily(Member protector, Member protege) {

        return familyRepository.findFamilyByProtectorAndProtege(protector, protege);
    }

}
