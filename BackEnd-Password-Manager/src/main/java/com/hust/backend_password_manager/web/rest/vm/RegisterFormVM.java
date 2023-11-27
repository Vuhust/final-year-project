package com.hust.backend_password_manager.web.rest.vm;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegisterFormVM {
    String email;
    String password;
}
