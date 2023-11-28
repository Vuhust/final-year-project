package com.hust.backend_password_manager.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    @GetMapping("/test")
    public ResponseEntity<Object> getSalt(
            @NonNull HttpServletRequest request
    ) throws Exception{


        return ResponseEntity.ok("validatedfgfgsdrf");
    }

}
