package com.hust.backend_password_manager.web.rest.vm;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@Setter
public class RegisterFormVM  implements Serializable {
    @Schema(example = "vu.pn194411@sis.hust.edu.vn")
    String email;
    @Schema(example = "12345678")
    String password;
    @Schema(example = "dsafsdafawefasefasdfe")
    private String salt;
}
