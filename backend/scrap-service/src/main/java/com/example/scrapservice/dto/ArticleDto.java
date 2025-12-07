package com.example.scrapservice.dto;



import java.time.LocalDateTime;

public class ArticleDto {

    private String title;
    private String authorName;
    private String articleUrl;
    private String imageUrl;
    private String siteName;
    private String description;
    private String date;

    public ArticleDto(String title, String authorName, String imageUrl, String articleUrl, String siteName, String description, String date) {
        this.title = title;
        this.authorName = authorName;
        this.imageUrl = imageUrl;
        this.articleUrl = articleUrl;
        this.siteName = siteName;
        this.description = description;
        this.date = date;
    }

    public ArticleDto(){}

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Article{" +
                "title='" + title + '\'' +
                ", authorName='" + authorName + '\'' +
                ", siteName='" + siteName + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                '}';
    }
}
