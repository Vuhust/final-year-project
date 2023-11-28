package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.until.ObjectAndMap;
import com.hust.backend_password_manager.web.rest.vm.LoginFormVM;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final SaltRepository saltRepository;

    private final JwtService jwtService;
    private final RedisTemplate redisTemplate;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String register(RegisterFormVM registerFormVM) throws Exception{
        String token;
        Account account = accountRepository.findOneByEmail(registerFormVM.getEmail());
        if(account == null){
            Random random = new Random();
            Integer OTP = random.nextInt(10000, 99999);
            String message = "Mã OTP :" + String.valueOf(OTP);
            emailService.sendOtp(registerFormVM.getEmail(), message);
            Map<String,Object> claim = ObjectAndMap.objectToMap(registerFormVM);
            token =  jwtService.generateToken(claim);
            redisTemplate.opsForValue().set(token, OTP);
            return token;
        } else {
            throw new Exception("asda");
        }
    }

    public void validateRegister(Integer otp, String token) throws Exception{
        Integer otpServer = (Integer) redisTemplate.opsForValue().get(token);
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
            redisTemplate.delete(token);

        } else {

            throw new Exception("dont know");
        }

    }
    public Object login(LoginFormVM registerFormVM){
        Account account = accountRepository.findOneByEmail(registerFormVM.getEmail());
        return jwtService.generateToken(account);
    }

    public Object getSalt(String token){
        Account account = accountRepository.findOneByEmail(jwtService.extractEmail(token));
        return saltRepository.findSaltByAccId(account.getId()) ;
    }


    public void saveAccount(String token) {
        return;
    }




}
