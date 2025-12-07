package com.example.articleservice.entity;


import jakarta.persistence.*;


@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String title;
    private String authorName;
    private String articleUrl;
    private String imageUrl;
    private String siteName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String publishDate;

    public Article(Long id, String title, String authorName, String articleUrl, String imageUrl, String siteName, String description, String publishDate) {
        Id = id;
        this.title = title;
        this.authorName = authorName;
        this.articleUrl = articleUrl;
        this.imageUrl = imageUrl;
        this.siteName = siteName;
        this.description = description;
        this.publishDate = publishDate;
    }

    public Article() {}


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }
}
