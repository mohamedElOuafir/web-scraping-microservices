package com.example.authservice.controller;



import com.example.authservice.dto.UserCredential;
import com.example.authservice.entity.User;
import com.example.authservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;

    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok().body(
                authService.registerUser(user)
        );
    }


    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody UserCredential userCredential) {

        if(authService.authenticate(userCredential).isPresent())
            return ResponseEntity.ok().body(authService.authenticate(userCredential));

        return ResponseEntity.badRequest().body(
                Map.of("message", "Email or password is incorrect")
        );
    }


    @DeleteMapping("delete/{idUser}")
    public ResponseEntity<?> deleteUser(@PathVariable long idUser) {

        authService.deleteUser(idUser);

        return ResponseEntity.ok().body(
                Map.of("message", "User has been deleted successfully")
        );
    }
}
