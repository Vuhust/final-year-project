package com.hust.backend_password_manager.entity.password_manager_entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    private String action;

    @Column(name = "`desc`")
    private String desc;

    private String location;

    private Date createDateTime;

    private Date lastUpdateDateTime;
    @PrePersist
    protected void onCreate() {
        this.createDateTime = new Date();
        this.lastUpdateDateTime = new Date();

    }
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdateDateTime = new Date();
    }

}
