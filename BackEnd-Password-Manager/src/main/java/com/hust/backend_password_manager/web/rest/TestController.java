package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/test")
@RequiredArgsConstructor
public class TestController {

    final EmailService emailService;

    final AccountRepository accountRepository;

    final SaltRepository saltRepository;

    final RedisTemplate template;



    @GetMapping("/email")
    public String testEmail(@RequestParam String toEmail) throws Exception{
        emailService.sendOtp(toEmail,  "1111");
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

    @GetMapping("/get_all_saltxx")
    public Object getSalt() throws Exception{
        return saltRepository.findAll();
    }



    @GetMapping("/get_all_salt")
    public Object getlt() throws Exception{
        template.opsForValue().set("loda","hello world");
        System.out.println("Value of key loda: "+template.opsForValue().get("lodax"));


        return saltRepository.findAll();
    }




}
