package com.example.scrapservice.dto;



import lombok.*;

import java.sql.Date;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArticleDto {

    private String title;
    private String articleUrl;
    private String imageUrl;
    private Date publishDate ;
    private Set<CreatorDto> creatorsDto;
    private SourceDto sourceDto;
    private CategoryDto categoryDto;


}
