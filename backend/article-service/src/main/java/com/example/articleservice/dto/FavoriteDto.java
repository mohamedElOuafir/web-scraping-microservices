package com.example.articleservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FavoriteDto {
    private Long idUser;
    private Long idArticle;
}
