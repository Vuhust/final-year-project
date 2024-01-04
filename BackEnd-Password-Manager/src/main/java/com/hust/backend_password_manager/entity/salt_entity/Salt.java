package com.hust.backend_password_manager.entity.salt_entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "salt")
@Data
public class Salt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accId;

    private String salt;

    private String secretKey;

    private String masterPasword;

}
