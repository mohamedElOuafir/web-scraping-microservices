package com.example.scrapservice.controller;


import com.example.scrapservice.dto.ArticleDto;
import com.example.scrapservice.service.ArticlesScraperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/articles")
public class ArticleScraperController {

    private final ArticlesScraperService articlesScraperService;

    public ArticleScraperController(ArticlesScraperService articlesScraperService) {
        this.articlesScraperService = articlesScraperService;
    }

    @GetMapping("/v2")
    public ResponseEntity<?> getArticles() {
        List<ArticleDto> articles = articlesScraperService.getArticles();

        return ResponseEntity.ok().body(Map.of("articles", articles));
    }
}
