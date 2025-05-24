package com.example.cart_service.respository;

import java.util.List;
import com.example.cart_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(String userId);
}
