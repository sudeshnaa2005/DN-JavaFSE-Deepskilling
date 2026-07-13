package org.example;

// Exercise 1: Configuring a Basic Spring Application
// Main class to load Spring context and test the configuration

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

    public static void main(String[] args) {

        // Load the Spring application context
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        // Get the BookService bean from the context
        BookService bookService =
                (BookService) context.getBean("bookService");

        // Test the configuration
        bookService.addBook("Spring in Action");
        System.out.println(bookService.getBook("Spring in Action"));

        System.out.println("Spring Application Context loaded successfully!");
    }
}