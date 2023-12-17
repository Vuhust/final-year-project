package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.aerogear.security.otp.Totp;
import org.jboss.aerogear.security.otp.api.Clock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.time.Instant;
import java.util.concurrent.locks.Lock;


@Service
@Slf4j
@RequiredArgsConstructor
public class TwoFactorAuth {

    @Autowired
    AccountRepository account;

    @Autowired
    Account accountBean;

    private final SaltRepository saltRepository;


    public Boolean validateOTP(String secret,String OTP){
        Totp totp = new Totp(secret, new Clock(30));
        return totp.verify(OTP);
    }

    public  String generateRandomSecret() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);

        // Encode the random bytes to Base32
        return Base64.getEncoder().encodeToString(bytes)
                .replaceAll("=", "")
                .replaceAll("\\+", "")
                .replaceAll("/", "")
                .replaceAll("-", "")
                .replaceAll("9", "")
                .replaceAll("8", "")
                .replaceAll("0", "")
                .replaceAll("1", "")
                .toUpperCase();
    }
}

