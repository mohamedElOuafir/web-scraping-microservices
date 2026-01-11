package com.example.articleservice.handler;


import com.example.articleservice.exceptions.InvalidArticleFormatException;
import com.example.articleservice.exceptions.InvalidFavoriteArticleException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestController
@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(InvalidFavoriteArticleException.class)
    public ResponseEntity<?> invalidFavoriteArticle(InvalidFavoriteArticleException exception){
        return ResponseEntity.badRequest().body(
                Map.of("error", exception.getMessage())
        );
    }

    @ExceptionHandler(InvalidArticleFormatException.class)
    public ResponseEntity<?> invalidArticleFormat(InvalidArticleFormatException exception){
        return ResponseEntity.badRequest().body(
                Map.of("error" , exception.getMessage())
        );
    }
}
