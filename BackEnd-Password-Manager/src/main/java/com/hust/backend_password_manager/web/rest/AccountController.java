package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.ResponseService;
import com.hust.backend_password_manager.service.TwoFactorAuth;
import com.hust.backend_password_manager.web.rest.vm.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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




//    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @Valid @RequestBody RegisterFormVM registerFormVM
            ) throws Exception{
        Map<String,Object> token = accountService.register(registerFormVM);
        return ResponseEntity.ok(ResponseService.genarateResponse(  token,"Kiểm tra email đẻ kích hoạt"));
    }

    @GetMapping("/register/validate")
    public ResponseEntity<Object> validateRegister(
        @RequestParam Integer otp,
        @RequestParam String token
    ) throws Exception{
        accountService.validateRegister(otp,token);
        return ResponseEntity.ok("Tao tài khoản master massword thành công");
    }

    @PostMapping("/forgotPassword-----")
    public ResponseEntity<Object> forgotPassword(
            @Valid @RequestBody RegisterFormVM registerFormVM
    ) throws Exception{
        Map<String,Object> token = accountService.register(registerFormVM);
        return ResponseEntity.ok(ResponseService.genarateResponse(  token,"Kiểm tra email đẻ kích hoạt"));
    }

    @PostMapping("/forgotPassword/validate-----")
    public ResponseEntity<Object> forgotPasswordValidate(
            @Valid @RequestBody RegisterFormVM registerFormVM
    ) throws Exception{
        Map<String,Object> token = accountService.register(registerFormVM);
        return ResponseEntity.ok(ResponseService.genarateResponse(  token,"Kiểm tra email đẻ kích hoạt"));
    }


    @PostMapping ("/login")
    public ResponseEntity<Object> login(
            @RequestBody LoginFormVM loginFormVM
            ) throws Exception{
        return ResponseEntity.ok(ResponseService.genarateResponse(  accountService.login(loginFormVM),"Thành công"));
    }


    @PostMapping ("/login/validate")
    public ResponseEntity<Object> validateLogin(
            @RequestBody ValidateLoginVM validateLoginVM
    ) throws Exception{
        return ResponseEntity.ok(accountService.validateOtpLogin(validateLoginVM.getToken(), validateLoginVM.getOTP() ));
    }


    @PostMapping("/getSalt")
    public ResponseEntity<Object> getSalt(
            HttpServletRequest request
            ) throws Exception{

        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);

        ResponseService.genarateResponse(  accountService.getSalt(token),"JWT");
        return ResponseEntity.ok("validate success");
    }


    @PostMapping("/changePassowrd")
    public ResponseEntity<Object> changePassword(
        @RequestBody ChangePasswordVM changePasswordVM
        ) throws Exception{
        accountService.changePassword(changePasswordVM.getCurrentPassword() , changePasswordVM.getNewPassword() );
        return ResponseEntity.ok("Thay đổi mật khẩu thành công");
    }

    @PutMapping("/editAccountSetting")
    public ResponseEntity<Object> editAccount(
        AccountSettingFormVM accountSettingFormVM
    ) throws Exception{
        accountService.editSetting(accountSettingFormVM);
        return ResponseEntity.ok("Sửa thông tin thành công");
    }
    @GetMapping("/getAccountSetting")
    public ResponseEntity<Object> editAccount(
    ) throws Exception{
        return ResponseEntity.ok().body(accountService.getAccountSetting());
    }

}
