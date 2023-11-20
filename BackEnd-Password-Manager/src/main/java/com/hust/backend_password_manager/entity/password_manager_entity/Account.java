package com.hust.backend_password_manager.entity.password_manager_entity;

import jakarta.persistence.*;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "account")
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String isActive;

    private String isAdmin;
    private Date createDateTime;

    private Date lastUpdateDate;



}
