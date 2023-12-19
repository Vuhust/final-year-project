package com.hust.backend_password_manager.entity.salt_entity;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
@Data
public class Test {
    private String t1;
    private String t2;

    @Override
    public String toString() {
        return "Test{" +
            "t1='" + t1 + '\'' +
            ", t2='" + t2 + '\'' +
            '}';
    }
}
