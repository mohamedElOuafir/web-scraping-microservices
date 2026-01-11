package com.example.scrapservice.service;

import com.example.scrapservice.dto.*;
import com.example.scrapservice.enums.Categories;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
public class ScrapService {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final KafkaTemplate<String, ArticleDto> kafkaTemplateArticle;
    private final String articleUrl = System.getenv("ARTICLES_URL");

    public ScrapService(
            RestTemplate restTemplate,
            ObjectMapper mapper,
            KafkaTemplate<String, ArticleDto> kafkaTemplateArticle
            ) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
        this.kafkaTemplateArticle = kafkaTemplateArticle;
    }


    @Scheduled(fixedRate = 86400000, initialDelay = 30000)
    public List<ArticleDto> getArticles() {
        List<ArticleDto> articles = new ArrayList<>();

        try {
            for(Categories c: Categories.values()){
                String finalArticleUrl = articleUrl + "&q=" + c.toString();
                String response =  restTemplate.getForObject(finalArticleUrl, String.class);

                JsonNode root = mapper.readTree(response);
                JsonNode articlesResult = root.path("news_results");

                CategoryDto categoryDto = new CategoryDto(c.toString());


                for (JsonNode currentArticle:articlesResult) {
                    JsonNode source =  currentArticle.path("source");

                    if(source.isMissingNode() || source.isNull() || source.path("authors").isMissingNode())
                        continue;

                    SourceDto sourceDto = new SourceDto();
                    sourceDto.setName(source.get("name").asText());
                    sourceDto.setIcon(source.get("icon").asText());

                    Set<CreatorDto> creatorDtoList = new HashSet<>();

                    for(JsonNode creator:source.path("authors")){
                        CreatorDto creatorDto = new CreatorDto(creator.asText());
                        creatorDtoList.add(creatorDto);
                    }

                    ArticleDto articleDto = new ArticleDto();

                    articleDto.setTitle(currentArticle.path("title").asText());
                    articleDto.setArticleUrl(currentArticle.path("link").asText());
                    articleDto.setImageUrl(currentArticle.path("thumbnail").asText());
                    articleDto.setPublishDate(convertFromISOStringToSQLDate(
                            currentArticle.path("iso_date").asText()
                    ));
                    articleDto.setCategoryDto(categoryDto);
                    articleDto.setSourceDto(sourceDto);
                    articleDto.setCreatorsDto(creatorDtoList);

                    kafkaTemplateArticle.send("article-topic", articleDto);
                    articles.add(articleDto);
                }
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
        }

        System.out.println("\n\nartciles scraped : " + articles.size()+"\n\n" + articles + "\n\n");
        return articles;
    }



    public Date convertFromISOStringToSQLDate(String isoString){
        Instant instantDate = Instant.parse(isoString);
        LocalDate localDate = instantDate.atZone(ZoneId.systemDefault()).toLocalDate();
        return Date.valueOf(localDate);
    }


}
