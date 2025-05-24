package com.example.cart_service.respository;

import com.example.cart_service.model.Book;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository  extends JpaRepository<Book,Long> {
    List<Book> findByuserId(String userId);

    @Modifying
    @Transactional  // Optional here, since service is already @Transactional
    @Query("DELETE FROM Book b WHERE b.userId = :userId AND b.bookId = :bookId")
    void deleteByUserIdAndBookId(@Param("userId") String userId, @Param("bookId") String bookId);
}