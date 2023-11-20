package com.hust.backend_password_manager;

import com.hust.backend_password_manager.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;

@SpringBootApplication
public class BackEndPasswordManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndPasswordManagerApplication.class, args);
	}

}
