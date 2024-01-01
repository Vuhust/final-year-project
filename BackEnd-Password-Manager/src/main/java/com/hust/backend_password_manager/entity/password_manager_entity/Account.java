package com.hust.backend_password_manager.entity.password_manager_entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Date;

@Entity
@Table(name = "account")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RequestScope(proxyMode = ScopedProxyMode.DEFAULT)
@Component
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @JsonIgnore
    private String password;

    private Boolean isActive;

    @JsonIgnore
    private Boolean enableTowFactoryAuth;

    @JsonIgnore
    private Boolean allowRestoreMasterKey;

    @JsonIgnore
    private Boolean isAdmin;

    @JsonIgnore
    private Date createDateTime;

    @JsonIgnore
    private Date lastUpdateDateTime;



    @PrePersist
    protected void onCreate() {
        this.createDateTime = new Date();
        this.lastUpdateDateTime = new Date();
        this.isActive = true;
        this.enableTowFactoryAuth = false;
        this.allowRestoreMasterKey= false;
        this.isAdmin = false;
    }
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdateDateTime = new Date();
    }


}
