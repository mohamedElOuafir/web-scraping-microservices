package com.example.articleservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryDistribution {

    private CategoryDto category;
    private Long categoryCount;

}
