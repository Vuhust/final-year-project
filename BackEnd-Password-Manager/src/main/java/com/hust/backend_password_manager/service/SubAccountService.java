package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.AccountBean;
import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import com.hust.backend_password_manager.entity.password_manager_entity.SubAccount;
import com.hust.backend_password_manager.entity.salt_entity.Salt;
import com.hust.backend_password_manager.repository.password_manager_entity.AccountRepository;
import com.hust.backend_password_manager.repository.password_manager_entity.SubAccountRepository;
import com.hust.backend_password_manager.repository.salt_entity.SaltRepository;
import com.hust.backend_password_manager.web.rest.err.MyError;
import com.hust.backend_password_manager.web.rest.vm.SubAccountVM;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubAccountService {
    private final SubAccountRepository subAccountRepository;
    private final AccountService accountService;
    private final AccountBean accountBean;

    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final SaltRepository saltRepository;


    public void addSubAccount(SubAccountVM subAccount){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = new SubAccount();
        BeanUtils.copyProperties(subAccount, subAcc ,"id");
        subAcc.setAccId(account.getId());
        subAccountRepository.save(subAcc);
    }


    public void editSubAccount(SubAccountVM subAccount){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = subAccountRepository.findById(subAccount.getId()).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        if(!account.getId().equals(subAcc.getAccId())){
            throw new MyError("Bạn không có quyền chỉnh tài khoản này");
        }
        BeanUtils.copyProperties(subAccount, subAcc,"id");
        subAccountRepository.save(subAcc);
    }

    public void deleteSubAccount(Integer id , HttpServletRequest request){
        Account account = new Account();
        BeanUtils.copyProperties(accountBean,account);
        SubAccount subAcc = subAccountRepository.findById((long) id).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        if(!account.getId().equals(subAcc.getAccId())){
            throw new MyError("Bạn không có quyền chỉnh tài khoản này");
        }
        subAccountRepository.delete(subAcc);
    }
    public List<SubAccount> getSubAccountList(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);;
        String email = jwtService.extractEmail(token);
        Account account = accountRepository.findOneByEmail(email);
        Salt salt = saltRepository.findByAccId(account.getId());
        List<SubAccount> subAccountList = subAccountRepository.findSubAccountByAccId(account.getId());
        return subAccountList;
    }
    public Object getSecret(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);;
        String email = jwtService.extractEmail(token);
        Account account = accountRepository.findOneByEmail(email);
        Salt salt = saltRepository.findByAccId(account.getId());
        if(salt== null){
            throw new MyError("Them salt vo trc");

        }
        return Map.of("email", email, "secret", salt.getSecretKey());

    }




}
