package com.products.Repositories;


import com.products.Entitys.categories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// JpaRepository<Entity, PrimaryKeyDataType>
public interface categoryRepo extends JpaRepository<categories, Integer> {
    // Spring Data JPA automatically provides: save(), findById(), findAll(), deleteById(), etc.
}
