package com.github.apoorvsr.spa_spring_angular.controllers;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UIController {
    
    @GetMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
    
    @GetMapping("/token")
    public Map<String,String> getMethodName(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }
    
}
