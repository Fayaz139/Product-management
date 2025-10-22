package com.products.Entitys;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table
public class products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productid;

    @Column
    private String productname;

    @Column
    private String productimg;

    @Column
    private int price; 

    @Column
    private int stock;

    // Define the Many-to-One relationship with CategoryTable
    @ManyToOne
    @JoinColumn(name = "categoryid") // Maps to the FOREIGN KEY column
    @JsonBackReference
    @JsonIgnoreProperties("products") //this is for react testing
    private categories category;

    // Default constructor (required by JPA)
    public products() {
		// TODO Auto-generated constructor stub
	}

	public products(int productid, String productname, String productimg, int price, int stock, categories category) {
		super();
		this.productid = productid;
		this.productname = productname;
		this.productimg = productimg;
		this.price = price;
		this.stock = stock;
		this.category = category;
	}

	public products(String productname, String productimg, int price, int stock, categories category) {
		super();
		this.productname = productname;
		this.productimg = productimg;
		this.price = price;
		this.stock = stock;
		this.category = category;
	}

	public products(int productid, String productname, String productimg, int price, int stock) {
		super();
		this.productid = productid;
		this.productname = productname;
		this.productimg = productimg;
		this.price = price;
		this.stock = stock;
	}

	public products(String productname, String productimg, int price, int stock) {
		super();
		this.productname = productname;
		this.productimg = productimg;
		this.price = price;
		this.stock = stock;
	}

	public int getProductid() {
		return productid;
	}

	public void setProductid(int productid) {
		this.productid = productid;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getProductimg() {
		return productimg;
	}

	public void setProductimg(String productimg) {
		this.productimg = productimg;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public categories getCategory() {
		return category;
	}

	public void setCategory(categories category) {
		this.category = category;
	}
}
