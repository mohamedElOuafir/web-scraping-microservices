package com.example.bookservice.service;


import com.example.bookservice.dto.BookDto;
import com.example.bookservice.entity.Book;
import com.example.bookservice.repository.BookRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @KafkaListener(topics = "book-topic", groupId = "book-group")
    public Book insertBooks(BookDto bookDto){
        Book savedBook = new Book();

        savedBook.setTitle(bookDto.getTitle());
        savedBook.setAuthor(bookDto.getAuthor());
        savedBook.setPublisher(bookDto.getPublisher());
        savedBook.setDescription(bookDto.getDescription());
        savedBook.setImageUrl(bookDto.getImageUrl());
        savedBook.setCategory(bookDto.getCategory());
        savedBook.setPublishedDate(bookDto.getPublishedDate());
        savedBook.setImageUrl(bookDto.getImageUrl());
        savedBook.setPreviewUrl(bookDto.getPreviewUrl());

        return bookRepository.save(savedBook);

    }


    public Book addBook(Book book){
        return bookRepository.save(book);
    }


    @Scheduled(initialDelay = 0)
    public void clearAllBooks(){
        bookRepository.deleteAll();
    }

}
