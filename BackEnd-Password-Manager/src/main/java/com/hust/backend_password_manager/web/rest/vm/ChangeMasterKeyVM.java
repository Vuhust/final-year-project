package com.hust.backend_password_manager.web.rest.vm;

import lombok.Data;

@Data
public class ChangeMasterKeyVM {
    private String currentMasterKey;
    private String newMasterKey;
}
