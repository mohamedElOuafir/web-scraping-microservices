package com.example.articleservice.exceptions;


public class InvalidArticleFormatException extends RuntimeException {
    public InvalidArticleFormatException(String message) {
        super(message);
    }
}
