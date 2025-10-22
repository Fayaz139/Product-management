package com.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.products.Entitys.products;

@Repository
public interface productRepo extends JpaRepository<products, Integer> {
    // You can add custom finder methods here, e.g.,
    // List<Product> findByCategoryCategoryid(Integer categoryId);
}
