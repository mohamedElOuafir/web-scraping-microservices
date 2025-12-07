package com.example.articleservice.controller;


import com.example.articleservice.entity.Article;
import com.example.articleservice.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/article")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllArticles() {
        List<Article> articles = articleService.getArticles();
        return ResponseEntity.ok().body(articles);
    }


}
