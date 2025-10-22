package com.products.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.products.Entitys.categories;
import com.products.Services.categoryService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categories")
public class categoryController {

    private final categoryService service;
    
    public categoryController(categoryService categoryService) {
        this.service = categoryService;
    }

    @GetMapping("/")
    public List<categories> getCategories() {
    	return service.getAllCategories();
    }
    
   @GetMapping("/{id}")
   public categories getCategory(@PathVariable int id) {
	   return service.findCategory(id);
   }
   
   @PostMapping("/add")
   public categories addCategory(@RequestBody categories name) {
	   return service.addCategory(name);
   }
   
   //response entity is another way of writing HttpResponse and, <?> means of any type(int or string or any)
   @PutMapping("/{id}")
   public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody categories updatedCategory) {
       categories existing = service.findCategory(id);
       if (existing == null) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Category not found with ID: " + id);
       }
       existing.setCategoryname(updatedCategory.getCategoryname());
       categories updated = service.updateCategory(existing);
       return ResponseEntity.ok(updated);
   }
   
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteCategory(@PathVariable int id) {
       categories category = service.findCategory(id);
       if (category == null) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Category not found with ID: " + id);
       }
       service.deleteCategory(id);
       return ResponseEntity.ok("Successfully deleted category with ID: " + id);
   }
}