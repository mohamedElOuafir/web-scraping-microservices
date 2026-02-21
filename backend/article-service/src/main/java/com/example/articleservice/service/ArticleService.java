package com.example.articleservice.service;


import com.example.articleservice.dto.*;
import com.example.articleservice.entity.*;
import com.example.articleservice.exceptions.InvalidArticleFormatException;
import com.example.articleservice.exceptions.InvalidFavoriteArticleException;
import com.example.articleservice.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final SourceRepository sourceRepository;
    private final CreatorRepository creatorRepository;
    private final FavoriteRepository favoriteRepository;


    public ArticleService(ArticleRepository articleRepository,  CategoryRepository categoryRepository, SourceRepository sourceRepository, CreatorRepository creatorRepository, FavoriteRepository favoriteRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.sourceRepository = sourceRepository;
        this.creatorRepository = creatorRepository;
        this.favoriteRepository = favoriteRepository;
    }


    public Page<Article> getArticles(Pageable pageable) {
        return articleRepository.findAll(pageable);
    }


    public ArticlesStats getArticlesStats() {
        ArticlesStats articlesStats = new ArticlesStats();
        List<CategoryDto> categories = new ArrayList<>();
        List<SourceDto> sources = new ArrayList<>();
        Long todaysArticlesCount = 0L;

        articlesStats.setTotalArticles(articleRepository.count());
        articlesStats.setTotalCreators(creatorRepository.count());
        articlesStats.setNumberSources(sourceRepository.count());

        // Calculons le nombre d'articles d'aujourd'hui
        for(Article article : articleRepository.findAll()) {
            if(article.getPublishDate().toLocalDate().getDayOfMonth() == LocalDate.now().getDayOfMonth()) {
                todaysArticlesCount++;
            }
        }
        articlesStats.setTodayArticles(todaysArticlesCount);

        // Recupérrons tous les categories et les 10 meilleurs sources!
        List<CategoryDistribution> categoriesDistribution = articleRepository.findCategoryDistribution();
        List<SourceDistribution> sourceDistributions = articleRepository.findTop10Source();

        articlesStats.setCategories(categoriesDistribution);
        articlesStats.setTop10Sources(sourceDistributions);

        System.out.println(articlesStats);

        return articlesStats;

    }


    public Set<Article> getAllFavorites(Long idUser) {
        Set<Favorite> favorites = favoriteRepository.findByIdUser(idUser);
        Set<Article> articles = new HashSet<>();

        for (Favorite favorite : favorites) {
            articles.add(favorite.getArticle());
        }

        return articles;
    }


    public void insertNewFavorite(Long idArticle, Long idUser) {
        Optional<Article> favoriteArticle = articleRepository.findById(idArticle);

        if(favoriteArticle.isPresent()) {
            Favorite favorite = new Favorite();
            favorite.setArticle(favoriteArticle.get());
            favorite.setIdUser(idUser);

            favoriteRepository.save(favorite);
        }else
            throw new InvalidFavoriteArticleException("This Article may not exists");
    }


    public void deleteFavorite(Long idArticle, Long idUser) {
        favoriteRepository.deleteFavoriteByArticleAndUser(idArticle, idUser);
    }


    @KafkaListener(topics = "article-topic", groupId = "article-group")
    public void insertArticle(ArticleDto articleDto) {

        validateArticleFormat(articleDto);

        if(articleRepository.findByTitle(articleDto.getTitle()).isPresent())
            return;

        Article article = new Article();

        article.setTitle(articleDto.getTitle());
        article.setArticleUrl(articleDto.getArticleUrl());
        article.setImageUrl(articleDto.getImageUrl());
        article.setPublishDate(articleDto.getPublishDate());
        article.setCategory(getOrCreateCategory(articleDto.getCategoryDto()));
        article.setSource(getOrCreateSource(articleDto.getSourceDto()));
        article.setCreators(getOrCreateCreators(articleDto.getCreatorsDto()));

        articleRepository.save(article);

    }


    @Scheduled(cron = "0 0 0 * * *")
    public void deleteOldArticles(){
        List<Long> articles = favoriteRepository.findAllArticlesId();
        articleRepository.deleteOldArticles(articles, Date.valueOf(LocalDate.now().minusDays(7)));
    }



    public Category getOrCreateCategory(CategoryDto categoryDto) {

        if(categoryRepository.findByName(categoryDto.getName()).isPresent()) {
            return categoryRepository.findByName(categoryDto.getName()).get();
        }
        Category category = new Category();
        category.setName(categoryDto.getName());

        return categoryRepository.save(category);
    }


    public Source getOrCreateSource(SourceDto sourceDto) {

        if(sourceRepository.findByName(sourceDto.getName()).isPresent()) {
            return sourceRepository.findByName(sourceDto.getName()).get();
        }
        Source source = new Source();
        source.setName(sourceDto.getName());
        source.setIcon(sourceDto.getIcon());

        return sourceRepository.save(source);
    }


    public Set<Creator> getOrCreateCreators(Set<CreatorDto> creatorDtos) {
        Set<Creator> creators = new HashSet<>();

        for (CreatorDto creatorDto : creatorDtos) {
            if(creatorRepository.findByName(creatorDto.getName()).isPresent()) {
                creators.add(creatorRepository.findByName(creatorDto.getName()).get());
                continue;
            }
            Creator creator = new Creator();
            creator.setName(creatorDto.getName());

            creators.add(creatorRepository.save(creator));
        }

        return creators;
    }


    public void validateArticleFormat(ArticleDto articleDto) {

        if (articleDto == null ||
            articleDto.getArticleUrl() == null ||
            articleDto.getImageUrl() == null ||
            articleDto.getPublishDate() == null ||
            articleDto.getCategoryDto() == null ||
            articleDto.getSourceDto() == null ||
            articleDto.getCreatorsDto() == null ||
            articleDto.getCreatorsDto().isEmpty()
        )
            throw new InvalidArticleFormatException("Invalid Article Format");
    }



}
