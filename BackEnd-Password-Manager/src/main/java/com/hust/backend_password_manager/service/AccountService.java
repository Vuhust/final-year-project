package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.until.ObjectAndMap;
import com.hust.backend_password_manager.web.rest.vm.LoginFormVM;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final SaltRepository saltRepository;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final CacheService cacheService;
    private final Random random;
    private final PasswordEncoder passwordEncoder;
    private final TwoFactorAuth twoFactorAuth;

    public String register(RegisterFormVM registerFormVM) throws Exception{
        String token;
        Account account = accountRepository.findOneByEmail(registerFormVM.getEmail());
        if(account == null){
            registerFormVM.setSecret("");
            Integer otp = random.nextInt(10000, 99999);
            String message = "Mã OTP :" + otp;
            emailService.sendOtp(registerFormVM.getEmail(), message);
            Map<String,Object> claim = ObjectAndMap.objectToMap(registerFormVM);
            token =  jwtService.generateToken(claim, jwtService.REGISTER);
            cacheService.putotp(token, otp);
            return token;
        } else {
            throw new Exception("asda");
        }
    }

    public void validateRegister(Integer otp, String token) throws Exception{
        Integer otpServer =  cacheService.getOTP(token);
        if(otp.equals(otpServer) ){
            Account account = new Account();
            RegisterFormVM registerFormVM = jwtService.getRegisterForm(token);
            account.setEmail(registerFormVM.getEmail());
            account.setPassword(passwordEncoder.encode(registerFormVM.getPassword()));
            account.setIsAdmin(false);
            account.setIsActive(true);
            accountRepository.save(account);
            Salt salt = new Salt();
            salt.setSalt(registerFormVM.getSalt());
            salt.setAccId(account.getId());
            cacheService.evictotp(token);
        } else {
            throw new Exception("dont know");
        }

    }
    public Object login(LoginFormVM loginFormVM) throws Exception{
        Account account = accountRepository.findOneByEmail(loginFormVM.getEmail());
        if(!passwordEncoder.matches(loginFormVM.getPassword(), account.getPassword())){
            throw new  Exception("password not match");
        }
        Map<String,Object> claim =ObjectAndMap.objectToMap(loginFormVM);
        String token =  jwtService.generateToken(claim,jwtService.LOGIN);
        return token;
    }

    public Object validateOtpLogin(String token, Integer otp) throws Exception{
//        Integer otpServer = cacheService.getOTP(token);
        if(jwtService.validateToken(token, jwtService.LOGIN)){
            String email =  jwtService.extractEmail(token);
            Account account = accountRepository.findOneByEmail(email);
            Salt salt = saltRepository.findByAccId(account.getId());
            if(!twoFactorAuth.validateOTP(salt.getSecretKey(),otp.toString())){
                throw new Exception("dont know");
            }

            Map<String,Object> claim = new HashMap<>(){{
                put("email" , account.getEmail());
            }};
            return jwtService.generateToken(claim, jwtService.TOKEN);
        } else {
            throw new Exception("dont know");
        }
    }

    public Object getSalt(String token){
        Account account = accountRepository.findOneByEmail(jwtService.extractEmail(token));
        return saltRepository.findSaltByAccId(account.getId()) ;
    }


    public Object changePassword(String email,String newPassword){
        Account account = accountRepository.findOneByEmail(email);
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
        return true;
    }


}
