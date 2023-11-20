package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
@RequiredArgsConstructor
public class TestController {

    final EmailService emailService;

    final AccountRepository accountRepository;

    final SaltRepository saltRepository;


    @GetMapping("/email")
    public String testEmail() throws Exception{
        emailService.sendSimpleMessage("phannhuvu2001@gmail.com", "heheh", "1111");
        return "hehe";
    }

    @PostMapping("/add_account")
    public Object addAccount() throws Exception{
        Account kk = new Account();
        kk.setEmail("a@gmail.0om");
        return accountRepository.save(kk);
    }

    @GetMapping("/get_all_account")
    public Object getAccount() throws Exception{
        return accountRepository.findAll();
    }


    @PostMapping("/add_salt")
    public Object addSalt() throws Exception{
        Salt kk = new Salt();
        return saltRepository.save(kk);
    }

    @GetMapping("/get_all_salt")
    public Object getSalt() throws Exception{
        return saltRepository.findAll();
    }



}
