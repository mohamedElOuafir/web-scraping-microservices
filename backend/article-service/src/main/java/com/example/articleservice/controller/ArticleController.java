package com.example.articleservice.controller;


import com.example.articleservice.entity.Article;
import com.example.articleservice.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

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
        return ResponseEntity.ok().body(
                Map.of("articles", articles)
        );
    }


    @PostMapping("/new-favorite/{idArticle}")
    public ResponseEntity<?> addNewFavorite(
            @PathVariable Long idArticle,
            @RequestHeader("User-Id") Long idUser
            ) {
        articleService.insertNewFavorite(idArticle, idUser);
        return ResponseEntity.ok().body(
                Map.of(
                        "inserted", true
                )
        );
    }


    @GetMapping("/favorites/all")
    public ResponseEntity<?> getAllFavorites(@RequestHeader("User-Id") Long idUser) {
        Set<Article> favoriteArticlesSet = articleService.getAllFavorites(idUser);

        return ResponseEntity.ok().body(
                Map.of("favorites", favoriteArticlesSet)
        );
    }


    @DeleteMapping("/remove-favorite/{idArticle}")
    public ResponseEntity<?> removeFavorite(
            @PathVariable Long idArticle,
            @RequestHeader("User-Id") Long idUser
    ) {
        articleService.deleteFavorite(idArticle, idUser);

        return ResponseEntity.ok().body(
                Map.of("deleted", true)
        );
    }




}
