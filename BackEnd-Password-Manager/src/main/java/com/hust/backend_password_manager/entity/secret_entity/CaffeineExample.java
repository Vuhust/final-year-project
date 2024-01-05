package com.hust.backend_password_manager.entity.secret_entity;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import java.util.concurrent.ConcurrentMap;

public class CaffeineExample {
    public static void main(String[] args) {
        // Creating a Caffeine cache
        Cache<Integer, String> caffeineCache = Caffeine.newBuilder()
            .maximumSize(100)
            .build();

        // Putting some entries into the cache
        caffeineCache.put(1, "One");
        caffeineCache.put(2, "Two");
        caffeineCache.put(3, "Three");


        caffeineCache.asMap().keySet().removeIf(key -> key ==1);
        // Getting the keys as a ConcurrentMap
        ConcurrentMap<Integer, String> keyMap = caffeineCache.asMap();

        // Outputting the keys
        System.out.println("Keys in the Caffeine cache:");
        for (Integer key : keyMap.keySet()) {
            System.out.println(key);
        }
    }
}
