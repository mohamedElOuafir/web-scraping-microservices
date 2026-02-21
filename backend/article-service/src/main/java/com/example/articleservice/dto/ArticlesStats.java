package com.example.articleservice.dto;


import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ArticlesStats {

    private Long totalArticles;
    private Long todayArticles;
    private Long numberSources;
    private Long totalCreators;
    private List<SourceDistribution> top10Sources;
    private List<CategoryDistribution> categories;
}
