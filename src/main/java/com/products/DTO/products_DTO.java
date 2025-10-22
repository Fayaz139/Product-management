package com.products.DTO;

public class products_DTO {
	
	private String productname;
    private String productimg;
    private int price;
    private int stock;
    private int categoryId;
    
    public products_DTO() {
		// TODO Auto-generated constructor stub
	}

	public products_DTO(String productname, String productimg, int price, int stock, int categoryId) {
		super();
		this.productname = productname;
		this.productimg = productimg;
		this.price = price;
		this.stock = stock;
		this.categoryId = categoryId;
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

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
}
