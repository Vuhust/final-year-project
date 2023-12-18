package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.entity.password_manager_entity.SubAccount;
import com.hust.backend_password_manager.repository.password_manager_entity.SubAccountRepository;
import com.hust.backend_password_manager.web.rest.err.MyError;
import com.hust.backend_password_manager.web.rest.vm.SubAccountVM;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubAccountService {
    private final SubAccountRepository subAccountRepository;
    private final AccountService accountService;
    private final AccountBean

    public void addSubAccount(SubAccountVM subAccount){
        SubAccount subAcc = new SubAccount();
        BeanUtils.copyProperties(subAccount, subAcc ,"id");
        subAccountRepository.save(subAcc);
    }


    public void editSubAccount(SubAccountVM subAccount){
        SubAccount subAcc = subAccountRepository.findById(subAccount.getId()).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        BeanUtils.copyProperties(subAccount, subAcc,"id");
        subAccountRepository.save(subAcc);
    }

    public void deleteSubAccount(Integer id){
        SubAccount subAcc = subAccountRepository.findById((long) id).orElse(null);
        if(subAcc == null){
            throw new MyError("Tài Khoản con Không tồn tại");
        }
        subAccountRepository.delete(subAcc);
    }
}
