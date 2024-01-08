package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.ResponseService;
import com.hust.backend_password_manager.service.TwoFactorAuth;
import com.hust.backend_password_manager.web.rest.vm.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {


    final TwoFactorAuth twoFactorAuth;
    final AccountService accountService;


    public ResponseEntity<Object> checkEmailExit(){


        return ResponseEntity.ok("heheh");
    }




    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @Valid @RequestBody RegisterFormVM registerFormVM
            ) throws Exception{
        Map<String,Object> token = accountService.register(registerFormVM);
        return ResponseEntity.ok(ResponseService.generateResponse(  token,"Kiểm tra email đẻ kích hoạt"));
    }

    @GetMapping("/register/validate")
    public ResponseEntity<Object> validateRegister(
        @RequestParam String token
    ) throws Exception{
        accountService.validateRegister(token);
        return ResponseEntity.ok("Tao tài khoản master massword thành công");
    }


    @PostMapping ("/login")
    public ResponseEntity<Object> login(
            @RequestBody LoginFormVM loginFormVM
            ) throws Exception{
        return ResponseEntity.ok(ResponseService.generateResponse(  accountService.login(loginFormVM),"Thành công"));
    }


    @PostMapping ("/login/validate")
    public ResponseEntity<Object> validateLogin(
            @RequestBody ValidateLoginVM validateLoginVM
    ) throws Exception{
        return ResponseEntity.ok(accountService.validateOtpLogin(validateLoginVM.getToken(), validateLoginVM.getOtp() ));
    }




    @PutMapping("/changePassowrd")
    public ResponseEntity<Object> changePassword(
        @RequestBody ChangePasswordVM changePasswordVM
        ) {
        accountService.changePassword(changePasswordVM.getCurrentPassword() , changePasswordVM.getNewPassword() );
        return ResponseEntity.ok("Thay đổi mật khẩu thành công");
    }

    @PutMapping("/editAccountSetting")
    public ResponseEntity<Object> editAccount(
        AccountSettingFormVM accountSettingFormVM
    ) {
        accountService.editSetting(accountSettingFormVM);
        return ResponseEntity.ok("Sửa thông tin thành công");
    }
    @GetMapping("/getAccountSetting")
    public ResponseEntity<Object> editAccount(
    ) {
        return ResponseEntity.ok().body(accountService.getAccountSetting());
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<Object> forgotPassword(
            @RequestBody ForgotPasswordVM forgotPasswordVM
    ) {
        accountService.forgotPassword(forgotPasswordVM);
        return ResponseEntity.ok().body("Kiểm tra email");
    }
    @GetMapping("/forgotPassword/Validate")
    public ResponseEntity<Object> forgotPasswordValidate(
            @RequestParam String token
    ) {
        accountService.forgotPasswordValidate(token);
        return ResponseEntity.ok().body("Mật khẩu đã được thay đổi");
    }


}
