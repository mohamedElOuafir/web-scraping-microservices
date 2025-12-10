package com.example.bookservice.controller;


import com.example.bookservice.entity.Book;
import com.example.bookservice.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks() {
        List<Book> books = bookService.getAllBooks();

        return ResponseEntity.ok().body(
                Map.of("books", books)
        );
    }


    @PostMapping("/add")
    public ResponseEntity<?> insertBook(@RequestBody Book book) {
        Book savedbook = bookService.addBook(book);

        return ResponseEntity.ok().body(savedbook);

    }
}
