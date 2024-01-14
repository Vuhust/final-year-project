package com.hust.backend_password_manager.web.rest.vm;

import lombok.Data;

@Data
public class ChangeMasterPasswordVM {
    private String currentMasterPassword;
    private String newMasterPassword;
}
