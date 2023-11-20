package com.hust.backend_password_manager.entity.password_manager_entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String accId;

    private String title;

    @Column(name = "`desc`")
    private String desc;


    private String isReaded;

    private Date createDateTime;

    private Date lastUpdateDate;

}