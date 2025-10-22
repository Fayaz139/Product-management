package com.products.Services;


import java.util.List;

import org.springframework.stereotype.Service;

import com.products.Entitys.categories;
import com.products.Repositories.categoryRepo;

@Service
public class categoryService {

    private final categoryRepo repo;

    
    public categoryService(categoryRepo categoryRepository) {
        this.repo = categoryRepository;
    }

    public List<categories> getAllCategories() {
    	return repo.findAll();
    }
    
    public categories addCategory(categories category) {
    	return repo.save(category);
    }
    
    public categories updateCategory(categories category) {
    	return repo.save(category);
    }
    
    public categories findCategory(int id) {
    	return repo.findById(id).orElse(null);
    }
    
    public void deleteCategory(int id) {
    	repo.deleteById(id);	
    }
}
