package com.hust.backend_password_manager.aspect;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
public class LogAspect {
    @Autowired
    HttpServletRequest request;

    @Pointcut("execution(* com.hust.backend_password_manager.web.rest.*.*(..))")
    public void loggingPointCut(){}

    @Before("loggingPointCut()")
    public void before(JoinPoint joinPoint){
      log.info("check success");
    }
    @After("loggingPointCut()")
    public void affter(JoinPoint joinPoint){
        log.info("start ip {} ,{} , arg {}" ,request.getRemoteHost() ,joinPoint.getSignature() , joinPoint.getArgs().toString());
    }

    @AfterThrowing("loggingPointCut()")
    public void beforeThrow(JoinPoint joinPoint){
        log.info("have error throw {} 1 {}",joinPoint.getTarget() ,joinPoint.toString() );
    }


}
