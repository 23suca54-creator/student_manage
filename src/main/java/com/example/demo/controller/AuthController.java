package com.example.demo.controller;



import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/auth")
    public class AuthController {

        @PostMapping("/login")
        public String login(@RequestParam String username,
                            @RequestParam String password) {

            // TEMP logic (later replaced with DB + JWT)
            if ("admin".equals(username) && "admin123".equals(password)) {
                return "Login successful";
            } else {
                return "Invalid credentials";
            }
        }
    }

