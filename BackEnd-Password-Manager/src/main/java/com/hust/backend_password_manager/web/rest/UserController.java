package com.hust.backend_password_manager.web.rest;

import com.hust.backend_password_manager.service.AccountService;
import com.hust.backend_password_manager.service.ResponseService;
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

    @PostMapping("/subAccount")
    public ResponseEntity<Object> addSubAccount(
        @RequestBody SubAccountVM subAccountVM
        ) throws Exception{
        subAccountService.addSubAccount(subAccountVM);

        return ResponseEntity.ok("Thêm thành công");
    }


    @PutMapping("/subAccount")
    public ResponseEntity<Object> editSubAccount(
        @RequestBody SubAccountVM subAccountVM
    ) throws Exception{
        subAccountService.editSubAccount(subAccountVM );
        return ResponseEntity.ok("Sửa thành công");
    }


    @DeleteMapping("/subAccount")
    public ResponseEntity<Object> deleteSubAccount(
        @RequestParam Integer id,
        HttpServletRequest request
    ) throws Exception{
        subAccountService.deleteSubAccount(id,request);
        return ResponseEntity.ok("Xóa thành công");
    }


    @GetMapping("/getUserInfo")
    public ResponseEntity<Object> getUserInfor(
    ) throws Exception{

        return ResponseEntity.ok( accountService.getAccountInfo());
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
    @PostMapping("/masterKey")
    public ResponseEntity<Object> setMasterKey(
        @RequestParam String masterKey
    ) throws Exception{
        accountService.saveMasterKey(masterKey);
        return  ResponseEntity.ok().body("");
    }

    @GetMapping("/checkMasterKey")
    public ResponseEntity<Object> checkMasterKey(
        @RequestParam String masterKey

    ) throws Exception{
        accountService.checkMasterKey(masterKey);
        return ResponseEntity.ok("");

    }




}
