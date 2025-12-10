package com.example.scrapservice.service;

import com.example.scrapservice.dto.ArticleDto;
import com.example.scrapservice.dto.BookDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class ScrapService {

    private final Integer maxBooksBySubject = 3;
    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final KafkaTemplate<String, ArticleDto> kafkaTemplateArticle;
    private final KafkaTemplate<String, BookDto> kafkaTemplateBook;
    private final String articleUrl = System.getenv("ARTICLES_URL");
    private final String bookUrl = System.getenv("BOOKS_URL");

    public ScrapService(RestTemplate restTemplate, ObjectMapper mapper, KafkaTemplate<String, ArticleDto> kafkaTemplateArticle, KafkaTemplate<String, BookDto> kafkaTemplateBook) {
        this.restTemplate = restTemplate;
        this.mapper = mapper;
        this.kafkaTemplateArticle = kafkaTemplateArticle;
        this.kafkaTemplateBook = kafkaTemplateBook;
    }


    @Scheduled(fixedRate = 86400000, initialDelay = 30000)
    public List<ArticleDto> getArticles() {
        List<ArticleDto> articles = new ArrayList<>();

        try {
            String response = restTemplate.getForObject(articleUrl, String.class);

            JsonNode root = mapper.readTree(response);
            JsonNode articlesResult = root.path("results");

            for (JsonNode currentArticle:articlesResult){

                ArticleDto newArticle = new ArticleDto(
                        currentArticle.path("title").asText(),
                        currentArticle.path("authors").get(0).path("name").asText(),
                        currentArticle.path("image_url").asText(),
                        currentArticle.path("url").asText(),
                        currentArticle.path("news_site").asText(),
                        currentArticle.path("summary").asText(),
                        currentArticle.path("published_at").asText()
                );

                kafkaTemplateArticle.send("article-topic", newArticle);
                articles.add(newArticle);
            }
        }catch (Exception e){
            System.err.println(e.getMessage());
        }

        System.out.println("\n\nartciles scraped : \n\n" + articles + "\n\n");
        return articles;
    }



    @Scheduled(initialDelay = 30000)
    public List<BookDto> getBooks() {
        List<BookDto> books = new ArrayList<>();
        List<String> subjects = new ArrayList<>(Arrays.asList(
                "java",
                "webdevelopment",
                "computerscience",
                "ai",
                "machinelearning",
                "cybersecurity"
        ));

        subjects.forEach(subject -> {
            Integer booksCounter = 0;

            try {
                String url =  bookUrl + subject;
                String response = restTemplate.getForObject(url, String.class);

                JsonNode root = mapper.readTree(response);
                JsonNode booksResult = root.path("items");

                for(JsonNode currentBook:booksResult){

                    JsonNode bookInfos = currentBook.path("volumeInfo");

                    BookDto newBook = new BookDto(
                            bookInfos.path("title").asText(),
                            bookInfos.path("authors").get(0).asText(),
                            bookInfos.path("publisher").asText(),
                            bookInfos.path("description").asText(),
                            bookInfos.path("publishedDate").asText(),
                            bookInfos.path("categories").get(0).asText(),
                            bookInfos.path("imageLinks").path("thumbnail").asText(),
                            bookInfos.path("previewLink").asText()
                    );


                    if(++booksCounter > maxBooksBySubject)
                        break;

                    kafkaTemplateBook.send("book-topic", newBook);
                    books.add(newBook);
                }
            }catch (Exception e){
                System.err.println(e.getMessage());
            }
        });


        System.out.println("\n\nbooks scraped : \n\n" + books + "\n\n");
        return books;
    }

}
