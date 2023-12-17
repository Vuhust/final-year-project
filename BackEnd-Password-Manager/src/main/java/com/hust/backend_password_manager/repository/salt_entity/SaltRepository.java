package com.hust.backend_password_manager.repository.salt_entity;

import com.hust.backend_password_manager.entity.salt_entity.Salt;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SaltRepository extends JpaRepository<Salt,Long> {
    public String findSaltByAccId(Long accId);

    public Salt  findByAccId(Long accId);


}
