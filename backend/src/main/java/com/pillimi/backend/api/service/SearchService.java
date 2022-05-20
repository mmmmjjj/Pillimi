package com.pillimi.backend.api.service;

import com.pillimi.backend.api.response.SearchRes;

import java.util.List;

public interface SearchService {

    List<SearchRes> searchByName(String keyword);
}
