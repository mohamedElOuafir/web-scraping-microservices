package com.example.articleservice.repository;

import com.example.articleservice.dto.CategoryDistribution;
import com.example.articleservice.dto.CategoryDto;
import com.example.articleservice.dto.SourceDistribution;
import com.example.articleservice.entity.Article;
import com.example.articleservice.entity.Source;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.QueryParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {
    Optional<Article> findByTitle(String title);


    // Requête pour teouver les 10 meilleurs source par le nombre d'articles
    @Query("select new com.example.articleservice.dto.SourceDistribution(" +
            "new com.example.articleservice.dto.SourceDto(a.source.name, a.source.icon), " +
            "count(a.source)) " +
            "from Article a " +
            "group by a.source " +
            "order by count(a.source) " +
            "desc " +
            "limit 10")
    List<SourceDistribution> findTop10Source();


    // Requête pour trouver la distribution des articles par categories
    @Query("select new com.example.articleservice.dto.CategoryDistribution(" +
            "new com.example.articleservice.dto.CategoryDto(a.category.name), " +
            "count(a.category))" +
            "from Article a " +
            "group by a.category")
    List<CategoryDistribution> findCategoryDistribution();

    @Transactional
    @Modifying
    @Query("delete from Article a where a.publishDate < :limitDate and a.Id not in :articlesId")
    void deleteOldArticles(
            @QueryParam("article")List<Long> articles,
            @QueryParam("limitDate")Date limitDate
    );
}
