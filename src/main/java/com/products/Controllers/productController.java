package com.products.Controllers;



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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.products.DTO.products_DTO;
import com.products.Entitys.categories;
import com.products.Entitys.products;
import com.products.Services.categoryService;
import com.products.Services.productService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class productController {

    private final productService service;
    private final categoryService cService;
    
    public productController(productService productService, categoryService categoryService) {
        this.service = productService;
        this.cService = categoryService;
    }

    @GetMapping("/")
    public List<products> getAllProducts() {
    	return service.getAllProducts();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable int id) {
    	products product = service.findProduct(id);
    	if(product == null) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + id);
    	}
    	return ResponseEntity.ok(product);
    }
    
//    @PostMapping("/add")
//    public products addProduct(@RequestBody products product) {
//    	return service.addProduct(product);
//    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody products_DTO dto) {
        categories category = cService.findCategory(dto.getCategoryId());
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category ID");
        }
        products product = new products();
        product.setProductname(dto.getProductname());
        product.setProductimg(dto.getProductimg());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(category);
        
        return ResponseEntity.ok(service.addProduct(product));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody products product) {
        products existing = service.findProduct(id);
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + id);
        }

        product.setProductid(id);
        products updated = service.updateProduct(product);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
    	products existing = service.findProduct(id);
    	if (existing == null) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + id);
    	}
    	
    	service.deleteProduct(id);
    	return ResponseEntity.ok("Successfully deleted product with ID: " + id);
    }
}
