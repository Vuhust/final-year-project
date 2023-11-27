package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.until.ObjectAndMap;
import com.hust.backend_password_manager.web.rest.vm.LoginFormVM;
import com.hust.backend_password_manager.web.rest.vm.RegisterFormVM;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final RedisTemplate<String,Integer> redisTemplate;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;

    public String register(RegisterFormVM registerFormVM) throws Exception{
        String jwt;
        Account account = accountRepository.findByEmail(registerFormVM.getEmail());
        if(account == null){
            Random random = new Random();
            Integer OTP = random.nextInt(10000, 99999);
            String message = "Mã OTP :" + String.valueOf(OTP);
            emailService.sendOtp(registerFormVM.getEmail(), message);
            jwt =  jwtService.generateToken(ObjectAndMap.objectToMap(registerFormVM) ;
            redisTemplate.opsForValue().set(jwt, OTP);

        }
        throw new Exception("asda");

    }

    public void validateRegister(Integer otp, String token) throws Exception{
        Integer otpServer = redisTemplate.opsForValue().get(token);
        if(otp == otpServer ){
            Account account = new Account();
            RegisterFormVM registerFormVM = jwtService.getRegisterForm(token);
            account.setEmail(registerFormVM.getEmail());
            account.setPassword(passwordEncoder.encode(registerFormVM.getPassword()));
            
            accountRepository.save(account);
        }
        throw new Exception("dont know");

    }
    public String login(LoginFormVM registerFormVM){
        Account account = accountRepository.findByEmail(registerFormVM.getEmail());
        return jwtService.generateToken(account);
    }


    public void saveAccount(String token) {
        return;
    }


}
