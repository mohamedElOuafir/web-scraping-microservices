package com.example.authservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginResponse {
    private String token;
    private UserInfo userInfo;
}
