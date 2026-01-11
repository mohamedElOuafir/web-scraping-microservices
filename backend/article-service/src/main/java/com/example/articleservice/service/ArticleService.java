package com.example.articleservice.service;


import com.example.articleservice.dto.*;
import com.example.articleservice.entity.*;
import com.example.articleservice.exceptions.InvalidArticleFormatException;
import com.example.articleservice.exceptions.InvalidFavoriteArticleException;
import com.example.articleservice.repository.*;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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


    public List<Article> getArticles() {
        return articleRepository.findAll();
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
