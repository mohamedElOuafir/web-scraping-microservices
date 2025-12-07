package com.example.authservice.dto;

public class LoginResponse {
    private String token;
    private Long Id;
    private String username;
    private String email;

    public LoginResponse(String token, Long Id, String username, String email) {
        this.token = token;
        this.Id = Id;
        this.username = username;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
