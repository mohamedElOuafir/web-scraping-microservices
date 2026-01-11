package com.example.authservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfo {
    private Long idUser;
    private String username;
    private String email;
}
