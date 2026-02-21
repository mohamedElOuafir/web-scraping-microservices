package com.example.articleservice.controller;


import com.example.articleservice.entity.Article;
import com.example.articleservice.service.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/article")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }


    @GetMapping("/stats")
    public ResponseEntity<?> getArticlesStats(){
        return ResponseEntity.ok().body(
                Map.of(
                        "articles_stats" ,articleService.getArticlesStats()
                ));
    }


    @GetMapping("/all/{page}")
    public ResponseEntity<?> getAllArticles(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Article> articles = articleService.getArticles(pageable);
        Long total = articles.getTotalElements();

        return ResponseEntity.ok().body(
                Map.of(
                        "articles", articles,
                        "total", total
                )
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
