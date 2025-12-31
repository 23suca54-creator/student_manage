package com.example.demo.controller;



import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
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
=======
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

>>>>>>> 0a353ba270f80a80c1e093cf4a22ef01a52d249e
