package com.hust.backend_password_manager.entity.secret_entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "secret")
@Data
public class Secret {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    private String salt;

    private String secretKey;

    private String masterPasword;

}
