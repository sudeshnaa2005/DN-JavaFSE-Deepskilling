package com.library.service;

import com.library.repository.BookRepository;

// Exercise 2: Implementing Dependency Injection
// BookService with setter method for DI

public class BookService {

    private BookRepository bookRepository;

    // Setter method for Dependency Injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("BookRepository injected into BookService!");
    }

    public void addBook(String bookName) {
        bookRepository.saveBook(bookName);
        System.out.println("BookService: Adding book - " + bookName);
    }

    public String getBook(String bookName) {
        return bookRepository.getBook(bookName);
    }
}