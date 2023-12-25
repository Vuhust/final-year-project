package com.hust.backend_password_manager.web.rest.vm;

import lombok.Data;

@Data
public class ChangePasswordVM {
    private String currentPassword;
    private String newPassword;
}
