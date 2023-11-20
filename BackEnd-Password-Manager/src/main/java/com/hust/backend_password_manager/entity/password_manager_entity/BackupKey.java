package com.hust.backend_password_manager.entity.password_manager_entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "backup_key")
public class BackupKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    private String keyEncrypt;
    private String salt;

    private Date createDateTime;

    private Date lastUpdateDate;


}