package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberUid(String uid);

    Optional<Member> findByMemberPhoneAndMemberNickname(String phone,String name);
}
