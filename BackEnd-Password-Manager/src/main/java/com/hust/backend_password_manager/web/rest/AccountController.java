package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.ResponseService;
import com.hust.backend_password_manager.service.TwoFactorAuth;
import com.hust.backend_password_manager.web.rest.vm.LoginFormVM;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {


    final TwoFactorAuth twoFactorAuth;
    final AccountService accountService;
//    final ResponseService responseService;


    public ResponseEntity<Object> checkEmailExit(){


        return ResponseEntity.ok("heheh");
    }


    @GetMapping("/hahaaaa")
    public ResponseEntity<Object> validateOTP(
            @RequestParam String OTP
    ) throws Exception{
        return ResponseEntity.ok(twoFactorAuth.validateOTP(OTP));
    }

    @Schema()
    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody RegisterFormVM registerFormVM
            ) throws Exception{
        return ResponseEntity.ok(accountService.register(registerFormVM));
    }

    @PostMapping("/register/validate")
    public ResponseEntity<Object> validateRegister(
            @RequestParam String token,
            @RequestParam Integer otp
    ) throws Exception{
        accountService.validateRegister(otp,token);
        return ResponseEntity.ok("validate success");
    }

    @PostMapping ("/login")
    public ResponseEntity<Object> login(
            @RequestBody LoginFormVM loginFormVM
            ) throws Exception{
          return ResponseEntity.ok(accountService.login(loginFormVM));
//        return ResponseEntity.ok(ResponseService.genarateResponse(  accountService.login(loginFormVM),"JWT"));
    }

    @PostMapping("/get-salt")
    public ResponseEntity<Object> getSalt(
            HttpServletRequest request
            ) throws Exception{

        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);

        ResponseService.genarateResponse(  accountService.getSalt(token),"JWT");
        return ResponseEntity.ok("validate success");
    }

}
