package com.hust.backend_password_manager.config;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
public class AccountFromRequest {
    String jwt;
    String email;
    String password;
}
