package com.hust.backend_password_manager.web.rest.vm;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Getter
@Setter
public class SubAccountVM {

    private Long id;
    @NotBlank
    private String url;
    private String desc;
    @NotBlank
    private String subUserName;
    @NotBlank
    private String subUserPwdEncrypt;

}
