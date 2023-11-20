package com.hust.backend_password_manager.service;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;

@Service
@Slf4j
public class ResponseService {

    public ResponseData genarateResponse(Objects data, String message){
        return new ResponseData(message,data);

    }
}

class ResponseData{
    String message;
    Objects data;

    public ResponseData(String message, Objects data) {
        this.message = message;
        this.data = data;
    }
}
