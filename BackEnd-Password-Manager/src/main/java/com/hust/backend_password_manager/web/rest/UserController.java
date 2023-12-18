package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.SubAccountService;
import com.hust.backend_password_manager.web.rest.vm.SubAccountVM;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final AccountService accountService;
    private final SubAccountService subAccountService;

    @GetMapping("/test")
    public ResponseEntity<Object> getSalt(
            @NonNull HttpServletRequest request
    ) throws Exception{


        return ResponseEntity.ok("validatedfgfgsdrf");
    }

    @PostMapping("/addSubAccount")
    public ResponseEntity<Object> addSubAccount(
        @NonNull HttpServletRequest request,
        @RequestBody SubAccountVM subAccountVM
        ) throws Exception{
        subAccountService.addSubAccount(subAccountVM,request);

        return ResponseEntity.ok("Thêm thành công");
    }


    @PostMapping("/editSubAccount")
    public ResponseEntity<Object> editSubAccount(
        @RequestBody SubAccountVM subAccountVM,
        HttpServletRequest request
    ) throws Exception{
        subAccountService.editSubAccount(subAccountVM, request );
        return ResponseEntity.ok("Sửa thành công");
    }


    @PostMapping("/deleteSubAccount")
    public ResponseEntity<Object> deleteSubAccount(
        @RequestParam Integer id,
        HttpServletRequest request
    ) throws Exception{
        subAccountService.deleteSubAccount(id,request);
        return ResponseEntity.ok("Xóa thành công");
    }

    @GetMapping("/subAccountList")
    public ResponseEntity<Object> getSubAccList(
            @NonNull HttpServletRequest request
            ) throws Exception{

        return ResponseEntity.ok( subAccountService.getSubAccountList(request));
    }


    @GetMapping("/secretKey")
    public ResponseEntity<Object> getSecret(
            @NonNull HttpServletRequest request
    ) throws Exception{

        return ResponseEntity.ok( subAccountService.getSecret(request));
    }
}
