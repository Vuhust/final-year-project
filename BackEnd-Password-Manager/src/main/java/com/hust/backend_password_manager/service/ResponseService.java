package com.hust.backend_password_manager.service;

import com.hust.backend_password_manager.service.dto.ResponseData;


import org.springframework.stereotype.Service;



public class ResponseService {

    public static ResponseData genarateResponse(Object data, String message){
        return new ResponseData(message,data);

    }
}



