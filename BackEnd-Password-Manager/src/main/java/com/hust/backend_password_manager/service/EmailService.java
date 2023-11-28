package com.hust.backend_password_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendOtp(
            String to, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("passwordmanager@gmail.com");
        message.setTo(to);
        message.setSubject("Mã OTP");
        message.setText(text);
        emailSender.send(message);
    }

    @Bean
    public SimpleMailMessage templateSimpleMessage() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(
                "This is the test email template for your email:\n%s\n");
        return message;
    }
}