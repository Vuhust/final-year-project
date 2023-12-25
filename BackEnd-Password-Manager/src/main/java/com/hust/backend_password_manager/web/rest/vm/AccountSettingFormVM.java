package com.hust.backend_password_manager.web.rest.vm;

import lombok.Data;

@Data
public class AccountSettingFormVM {

    private Boolean enable2FA;

    private Boolean receiveEmailNotification;

    private Boolean allowRecoveryMasterKey;

}
