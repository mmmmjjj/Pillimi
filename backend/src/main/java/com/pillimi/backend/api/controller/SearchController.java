package com.pillimi.backend.api.controller;

import com.pillimi.backend.api.service.SearchService;
import com.pillimi.backend.common.exception.InvalidException;
import com.pillimi.backend.common.exception.handler.ErrorCode;
import com.pillimi.backend.common.exception.handler.ErrorResponse;
import com.pillimi.backend.common.model.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

import static com.pillimi.backend.common.model.ResponseMessage.*;

@Api(value = "약품 검색 API", tags = "Search")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final SearchService searchService;

    @ApiOperation(value = "약품 검색", notes = "이름으로 약품을 검색하는 api입니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = SEARCH),
            @ApiResponse(code = 400, message = INVALID_INPUT, response = ErrorResponse.class),
            @ApiResponse(code = 401, message = UNAUTHORIZED, response = ErrorResponse.class),
            @ApiResponse(code = 500, message = SERVER_ERROR, response = ErrorResponse.class)
    })
    @GetMapping(value = "")
    public ResponseEntity<BaseResponseBody> updateMemberInfo(@RequestParam(value = "keyword") @ApiParam(value = "검색할 키워드", required = true) String keyword) {

        //유효성 체크 (공백이거나 한글이 포함되지 않은 키워드는 불가)
        if ("".equals(keyword.trim()) || !Pattern.matches(".*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*",keyword))
            throw new InvalidException(ErrorCode.INVALID_INPUT_VALUE);

        return ResponseEntity.ok(BaseResponseBody.of(HttpStatus.CREATED, SEARCH,searchService.searchByName(keyword)));
    }
}
