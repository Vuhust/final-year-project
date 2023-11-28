package com.hust.backend_password_manager.web.rest.vm;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;




@Getter
@Setter
public class LoginFormVM  {
    @Schema(example = "vu.pn194411@sis.hust.edu.vn")
    private String email;
    @Schema(example = "12345678")
    private String password;

    public LoginFormVM(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
