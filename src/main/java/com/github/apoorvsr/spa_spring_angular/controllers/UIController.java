package com.github.apoorvsr.spa_spring_angular.controllers;

import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UIController {
    @GetMapping("/resources")
    public Map<String, String> getHelloData() {
        Map<String, String> returnValues = new HashMap<>();
        returnValues.put("id", UUID.randomUUID().toString());
        returnValues.put("content", "Hello From Spring");
        return returnValues;
    }
    
    @GetMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
    
}
