package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.jboss.aerogear.security.otp.Totp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TwoFactorAuth {

    @Autowired
    AccountRepository account;

//    public String getGeneratedOTP() {
//
//        String secret = "1221221"; // Replace with your secret key
//        Totp totp = new Totp(secret);
//        String generatedOTP = totp.now(); // Generate OTP for the current time
//        return generatedOTP;
//    }

    public Boolean validateOTP(String OTP){
        String secret = "djjjdksisososoeorjejieiwosidkdkdjekowowodjjdkd"; // Replace with your secret key
        Totp totp = new Totp(secret);
        return totp.verify(OTP);
    }
}
