package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.TwoFactorAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {


    final TwoFactorAuth twoFactorAuth;

    public ResponseEntity<Object> checkEmailExit(){


        return ResponseEntity.ok("heheh");
    }


    @GetMapping("/hahaaaa")
    public ResponseEntity<Object> validateOTP(
            @RequestParam String OTP
    ) throws Exception{
        return ResponseEntity.ok(twoFactorAuth.validateOTP(OTP));
    }


}
