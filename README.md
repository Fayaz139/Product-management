# Full-Stack Product Management Application

This repository contains a full-stack application for managing product inventory.

The project is structured as a **monorepo**, with separate directories for the Spring Boot REST API and the React frontend.

## 🎯 Project Goals and Focus

This project was primarily created as a **building block** to establish a solid foundation in modern, robust API development.

The core focus was:
* **Building a RESTful Backend API** using **Spring Boot** and **Java**.
* Successfully implementing **JPA Entity Mapping** (particularly for the Many-to-One relationship between Products and Categories), which proved to be a significant **hurdle** overcome during development.
* The **frontend is intentionally basic**, lacking special design or detailed styling. Its sole purpose is to serve as a functional **user interface** to test, validate, and demonstrate the backend API's CRUD (Create, Read, Update, Delete) functionality.

This successful implementation now serves as the **architectural blueprint** for my next, larger project.

## 🧠 Key Learnings

| Topic | Learning Outcome |
| :--- | :--- |
| **JPA Entity Mapping** | Gained confidence in defining `@ManyToOne` relationships and correctly handling nested JSON objects (`category: { categoryid: 5 }`) versus flat IDs (`categoryId: 5`) for different API endpoints (PUT vs POST). |
| **RESTful Design** | Reinforced principles of statelessness, resource mapping, and appropriate use of HTTP methods (GET, POST, PUT, DELETE). |
| **React State Management** | Mastered inter-component communication by using the `onSaveSuccess` callback to automatically trigger state updates in parent components, eliminating the need for manual page refreshes. |
| **Error Resilience** | Implemented robust client-side error handling (e.g., using `String(value || '')` and optional chaining `?.`) to prevent application crashes when handling incomplete or null data from the API. |

***

## ⚙️ Prerequisites

To run this project locally, you must have the following installed:

* **Java Development Kit (JDK):** Version 17 or higher.
* **Node.js:** Latest LTS version (includes npm).
* **MySQL or PostgreSQL:** A database instance for the backend.

***

## 🛠️ Backend Setup (Spring Boot)

The backend provides the API endpoints and uses a database for persistence.

### 1. Database Configuration

1.  **Create a database** (e.g., `product_db`).
2.  Navigate to the `Backend/src/main/resources` folder.
3.  Open `application.properties` (or `application.yml`) and update the following properties with your database credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/product_db
    spring.datasource.username=your_db_username
    spring.datasource.password=your_db_password
    spring.jpa.hibernate.ddl-auto=update
    ```

### 2. Run the Backend

1.  Open **Spring Tool Suite (STS)**.
2.  Locate `ProductsApplication.java` inside `Backend/src/main/java`.
3.  Right-click the file and select **Run As** $\rightarrow$ **Spring Boot App**.

The backend should start on `http://localhost:9090`.

***

## 🌐 Frontend Setup (React)

The frontend communicates with the running backend API.

### 1. Install Dependencies

1.  Open your terminal or command prompt.
2.  Navigate into the frontend directory:
    ```bash
    cd frontend
    ```
3.  Install all required Node modules:
    ```bash
    npm install
    ```

### 2. Run the Frontend

1.  Ensure the backend is running on port 9090.
2.  Start the React development server:
    ```bash
    npm run dev
    ```

The application will typically be accessible in your browser at `http://localhost:5173`.

***

## 🔗 Key API Endpoints

The backend exposes resources via the following base paths:

| Resource | Base Path |
| :--- | :--- |
| **Products** | `http://localhost:9090/api/products/` |
| **Categories** | `http://localhost:9090/api/categories/` |

---
*Created by [Fayaz139]*
