package com.hust.backend_password_manager.until;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ObjectAndMap {
    public static Map<String, Object> objectToMap(Object object) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<>();
        Field[] fields = object.getClass().getDeclaredFields();

        for (Field field: fields) {
            field.setAccessible(true);
            map.put(field.getName(),  field.get(object));
        }

        return map;
    }

    public static Object mapToObject(Map<String,Object> map, Class<?> objectClass ) throws Exception {
        Object obj = objectClass.getDeclaredConstructor().newInstance();

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            try {
                Field field = objectClass.getDeclaredField(fieldName);
                field.setAccessible(true);
                Object fieldType = field.getType();
                field.set(obj , value);

            } catch (NoSuchFieldException e) {
                // Handle if the field does not exist in the objectClass
                log.error("Field '" + fieldName + "' does not exist in class " + objectClass.getSimpleName());
            }
        }
        return obj;
    }
}
