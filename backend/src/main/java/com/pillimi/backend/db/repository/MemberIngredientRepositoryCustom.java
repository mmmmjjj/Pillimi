package com.pillimi.backend.db.repository;

import com.pillimi.backend.db.entity.*;

public interface MemberIngredientRepositoryCustom {
    MemberIngredient findByMemberAndIngredient(Member member, Ingredient ingredient);
    void deleteByMemberAndIngredient(Member member, Ingredient ingredient);
    /*
     * member의 가족 리스트를 조회한다.
     */
}
