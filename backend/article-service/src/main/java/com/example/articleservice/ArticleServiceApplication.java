package com.example.articleservice;

import com.example.articleservice.entity.Article;
import com.example.articleservice.entity.Category;
import com.example.articleservice.entity.Creator;
import com.example.articleservice.entity.Source;
import com.example.articleservice.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@SpringBootApplication
@EnableDiscoveryClient
public class ArticleServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArticleServiceApplication.class, args);
    }

}
