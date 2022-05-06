package com.pillimi.backend;

import com.pillimi.backend.api.response.MemberMedicineRes;
import com.pillimi.backend.api.response.TodayMedicineRes;
import com.pillimi.backend.db.entity.Member;
import com.pillimi.backend.db.entity.MemberMedicine;
import com.pillimi.backend.db.repository.MemberMedicineRepository;
import com.pillimi.backend.db.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    MemberMedicineRepository memberMedicineRepository;
    @Autowired
    MemberRepository memberRepository;

    @Test
    void contextLoads() {

        Member member = memberRepository.getById(1L);
        List<TodayMedicineRes> list = memberMedicineRepository.findTodayMedicineList(member);

        System.out.println(list.size());
        System.out.println(list.get(0).getTime());
    }

}
