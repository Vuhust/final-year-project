package com.hust.backend_password_manager.repository.salt_entity;

import com.hust.backend_password_manager.entity.salt_entity.Salt;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SaltRepository extends JpaRepository<Salt,Long> {
    String findSaltByAccId(Long accId);

    Salt  findByAccId(Long accId);


}
