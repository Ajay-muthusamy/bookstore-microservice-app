package com.example.cart_service.controller;

import com.example.cart_service.model.Book;
import com.example.cart_service.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://50.17.125.82")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/add")
    public Book addToCart(@RequestBody Book book) {
        return bookService.addBookToCart(book);
    }

    @GetMapping("/user/{userId}")
    public List<Book> getUserCart(@PathVariable String userId) {
        return bookService.getBooksByUserId(userId);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCartItem(
            @RequestParam String userId,
            @RequestParam String bookId) {
        try {
            bookService.deleteByUserIdAndBookId(userId, bookId);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            e.printStackTrace(); // Make sure this prints the actual error in console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete item");
        }
    }

}
