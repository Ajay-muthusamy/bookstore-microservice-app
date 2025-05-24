package com.example.cart_service.service;

import com.example.cart_service.model.Book;
import com.example.cart_service.respository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private com.example.cart_service.respository.BookRepository bookRepository;

    public Book addBookToCart(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getBooksByUserId(String userId) {
        return bookRepository.findByuserId(userId);
    }

    @Transactional
    public void deleteByUserIdAndBookId(String userId, String bookId) {
        bookRepository.deleteByUserIdAndBookId(userId, bookId);
    }
}
