package com.hust.backend_password_manager.service.dto;

public record RecaptchaResponse(Boolean success,String challege_ts,String hostname,Double score, String action) {
}
