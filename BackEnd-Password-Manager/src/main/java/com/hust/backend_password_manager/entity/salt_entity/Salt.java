package com.hust.backend_password_manager.entity.salt_entity;

import jakarta.persistence.*;

@Entity
@Table(name = "salt")
public class Salt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
