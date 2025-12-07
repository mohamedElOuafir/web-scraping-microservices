package com.example.scrapservice.service;

import com.example.scrapservice.dto.ArticleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;


@Service
public class ArticlesScraperService {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final KafkaTemplate<String, ArticleDto> kafkaTemplate;
    private final String url = System.getenv("ARTICLES_URL");

    public ArticlesScraperService(RestTemplate restTemplate, ObjectMapper mapper, KafkaTemplate<String, ArticleDto> kafkaTemplate) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
        this.kafkaTemplate = kafkaTemplate;
    }


    @Scheduled(fixedRate = 86400000, initialDelay = 30000)
    public List<ArticleDto> getArticles() {
        List<ArticleDto> articles = new ArrayList<>();

        try {
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = mapper.readTree(response);
            JsonNode articlesResult = root.path("results");

            for (JsonNode a:articlesResult){

                ArticleDto article = new ArticleDto(
                        a.path("title").asText(),
                        a.path("authors").get(0).path("name").asText(),
                        a.path("image_url").asText(),
                        a.path("url").asText(),
                        a.path("news_site").asText(),
                        a.path("summary").asText(),
                        a.path("published_at").asText()
                );

                kafkaTemplate.send("article-topic", article);
                articles.add(article);
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
        }

        System.out.println("\n\nartciles scraped : \n\n" + articles + "\n\n");

        return articles;
    }

}
