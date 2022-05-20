package com.pillimi.backend.common.exception;

import com.pillimi.backend.common.exception.handler.ErrorCode;

public class DuplicateException extends BusinessException {
    public DuplicateException() {
        super(ErrorCode.DUPLICATE_INPUT_VALUE);
    }

    public DuplicateException(ErrorCode errorCode){
        super(errorCode);
    }
}
