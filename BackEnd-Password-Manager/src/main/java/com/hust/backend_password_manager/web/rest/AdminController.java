package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.ResponseService;
import com.hust.backend_password_manager.web.rest.vm.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AccountService accountService;
    @GetMapping("/userList")
    public ResponseEntity<Object> getUserList(
    ) throws Exception{
        return ResponseEntity.ok().body(accountService.getUserList());
    }

    @PutMapping("/userDetail")
    public ResponseEntity<Object> editUserDetail(
            @RequestBody User user
    ) throws Exception{

        accountService.editUser(user);
        return ResponseEntity.ok("Thành công");
    }


    @PutMapping("/userDetail/removeCountdown")
    public ResponseEntity<Object> editUserDetail(
            @RequestParam String email
    ) throws Exception{

        accountService.removeCountdown(email);
        return ResponseEntity.ok("Thành công");
    }



}
