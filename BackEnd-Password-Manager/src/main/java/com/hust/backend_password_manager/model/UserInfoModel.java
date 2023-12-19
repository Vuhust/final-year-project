package com.hust.backend_password_manager.model;

import lombok.Data;

@Data
public class UserInfoModel {
    String email;
//    Boolean setup2FA;
    String salt;
    Boolean setupMasterKey;
}
