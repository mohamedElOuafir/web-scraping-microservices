package com.example.articleservice.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.web.JsonPath;

import java.sql.Date;
import java.util.Set;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(unique = true)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String articleUrl;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    private Date publishDate;

    @ManyToOne
    @JoinColumn(name = "source_id")
    private Source source;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "article_creator",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "creator_id")
    )
    private Set<Creator> creators;

}
