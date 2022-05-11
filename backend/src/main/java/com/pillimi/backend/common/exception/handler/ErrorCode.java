package com.pillimi.backend.common.exception.handler;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),
    DUPLICATE_INPUT_VALUE(400, "C002", "Duplicate Input Value"),
    // Member
    REFRESH_TOKEN_INVALID(403,"M001","Refresh token is invalid"),
    MEMBER_NOT_FOUND(404, "M002", "Member Not Found"),
    ACCESS_DENIED(403, "M003", "Access Denied"),
    ALREADY_REGISTERED(403,"M004","Already Registered Member"),
    // Medicine
    MEDICINE_NOT_FOUND(404,"MD001","Medicine Not Found"),
    MEMBER_MEDICINE_NOT_FOUND(404,"M106","Member-Medicine not found"),
    ALREADY_REGISTERED_MEMBER_MEDICINE(403,"M107","Already Registered Member Medicine"),
    // Family
    FAMILY_REQUEST_NOT_FOUND(404,"F001","Family Request Not Found"),
    THEY_NOT_FAMILY(403,"F002","They Not Family"),
    ALREADY_FAMILY(403,"F003","They are already family"),
    // Alarm
    ALARM_NOT_FOUND(404, "A001","Alarm Not Found"),
    UPLOAD_FAIL(400,"A002","Upload Failed");

    private int status;
    private final String code;
    private final String message;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
