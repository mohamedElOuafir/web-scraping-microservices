package com.example.authservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserCredential {
    private String email;
    private String password;

}
