package com.example.articleservice.service;


import com.example.articleservice.dto.ArticleDto;
import com.example.articleservice.entity.Article;
import com.example.articleservice.repository.ArticleRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> getArticles() {
        return articleRepository.findAll();
    }

    @KafkaListener(topics = "article-topic", groupId = "article-group")
    public Article insertArticle(ArticleDto articleDto) {

        Article article = new Article();

        article.setTitle(articleDto.getTitle());
        article.setAuthorName(articleDto.getAuthorName());
        article.setImageUrl(articleDto.getImageUrl());
        article.setArticleUrl(articleDto.getArticleUrl());
        article.setDescription(articleDto.getDescription());
        article.setSiteName(articleDto.getSiteName());
        article.setPublishDate(articleDto.getDate());


        return articleRepository.save(article);
    }


    @Scheduled(fixedRate = 86400000)
    public void clearArticleData(){
        articleRepository.deleteAll();
    }


}
