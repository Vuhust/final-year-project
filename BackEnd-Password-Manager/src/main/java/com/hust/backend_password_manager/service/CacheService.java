package com.hust.backend_password_manager.service;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Cache;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class CacheService {

    private Cache<String,Integer> cacheOtp = Caffeine.newBuilder().expireAfterWrite(50, TimeUnit.SECONDS).build();

    private Cache<String,Boolean> cacheToken = Caffeine.newBuilder().expireAfterWrite(60*60*24*30, TimeUnit.SECONDS).build();


    public Integer getOTP(String token) {
        return cacheOtp.getIfPresent(token);
    }

    public void putotp(String token, Integer otp) {
        cacheOtp.put(token,otp);
    }

    public void evictotp(String token) {
        cacheOtp.invalidate(token);
    }


    public void putToken(String token){
        cacheToken.put(token, true);
    }


    public Boolean validateToken(String token){
        return cacheToken.getIfPresent(token);
    }

    public void evictToken(String token) {
        cacheToken.invalidate(token);
    }

}
