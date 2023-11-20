package com.hust.backend_password_manager.entity.password_manager_entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "sub_account")
public class SubAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accId;

    private String url;

    @Column(name = "`desc`")
    private String desc;
    private String subUserName;
    private String subUserPwdEncrypt;

    private Date createDateTime;
    private Date lastUpdateDateTime;



}
