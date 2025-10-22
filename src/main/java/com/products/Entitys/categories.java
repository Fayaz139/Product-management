package com.products.Entitys;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table
public class categories {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer categoryid;

	@Column
	private String categoryname;

	// Define the One-to-Many relationship with Product
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	//fetch = FetchType.EAGER is for react testing
	@JsonManagedReference
	private List<products> products;

	// Default constructor (required by JPA)
	public categories() {
		// TODO Auto-generated constructor stub
	}

	public categories(Integer categoryid, String categoryname, List<products> products) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
		this.products = products;
	}

	public categories(String categoryname, List<products> products) {
		super();
		this.categoryname = categoryname;
		this.products = products;
	}

	public categories(String categoryname) {
		super();
		this.categoryname = categoryname;
	}

	public categories(Integer categoryid, String categoryname) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
	}

	public Integer getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(Integer categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}

	public List<products> getProducts() {
		return products;
	}

	public void setProducts(List<products> products) {
		this.products = products;
	}

	@Override
	public String toString() {
	    return "categories [categoryid=" + categoryid + ", categoryname=" + categoryname + "]";
	}
	
	
}

