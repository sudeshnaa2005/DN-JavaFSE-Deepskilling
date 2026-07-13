package com.library.repository;

// BookRepository class - handles data access
public class BookRepository {

    public void saveBook(String bookName) {
        System.out.println("Book saved: " + bookName);
    }

    public String getBook(String bookName) {
        return "Book: " + bookName;
    }
}