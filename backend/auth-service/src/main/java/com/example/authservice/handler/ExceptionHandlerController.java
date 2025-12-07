package com.example.authservice.handler;


import com.example.authservice.exceptions.UserAlreadyExistsException;
import com.example.authservice.exceptions.UserNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
        );
    }


    @ExceptionHandler(UserNotExistsException.class)
    public ResponseEntity<?> handleUserNotExistsException(UserNotExistsException e) {
        return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
        );
    }
}
