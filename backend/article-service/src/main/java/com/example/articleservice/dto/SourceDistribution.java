package com.example.articleservice.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SourceDistribution {

    private SourceDto source;
    private Long sourceCount;
}
