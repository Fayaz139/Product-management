package com.products.Services;


import java.util.List;

import org.springframework.stereotype.Service;

import com.products.Entitys.products;
import com.products.Repositories.productRepo;

@Service
public class productService {

    private final productRepo repo;

    // Constructor Injection
    public productService(productRepo productRepository) {
        this.repo = productRepository;
    }

    public List<products> getAllProducts() {
    	return repo.findAll();
    }
    
    public products findProduct(int id) {
    	return repo.findById(id).orElse(null);
    }
    
    public products addProduct(products product) {
        return repo.save(product);
    }
    
    public products updateProduct(products product) {
    	return repo.save(product);
    }
    
    public void deleteProduct(int id) {
    	repo.deleteById(id);
    }
}
