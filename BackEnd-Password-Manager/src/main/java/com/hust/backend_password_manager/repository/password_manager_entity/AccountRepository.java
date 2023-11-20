package com.hust.backend_password_manager.repository.password_manager_entity;

import com.hust.backend_password_manager.entity.password_manager_entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<Account,Long> {
}
