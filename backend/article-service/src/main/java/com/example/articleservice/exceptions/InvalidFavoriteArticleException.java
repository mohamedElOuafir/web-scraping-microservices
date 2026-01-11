package com.example.articleservice.exceptions;

public class InvalidFavoriteArticleException extends RuntimeException {
    public InvalidFavoriteArticleException(String message) {
        super(message);
    }
}
