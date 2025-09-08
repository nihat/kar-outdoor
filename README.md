# Kar Outdoor 🏞️

**Kar Outdoor** is a modern **e-commerce application** for outdoor products.  
It offers complete product management (CRUD), cart, and checkout flows on a scalable stack: **Spring Boot (Java 21)** + **Angular 18** + **PostgreSQL**, communicating via **REST APIs**.

---

## ✨ Features

- **Product Management (Admin)**: create, list, update, delete products
- **Shopping**: browse products, add to cart, update/remove items, checkout
- **Security (optional)**: JWT/Spring Security-ready structure (if enabled)
- **UX**: responsive Angular 18 front-end (SPA)

---

## 🧱 Tech Stack

- **Backend:** Spring Boot (Java 21), REST API, JPA/Hibernate, (Lombok if used)
- **Frontend:** Angular 18 (project directory: `kar-outdoor-ui`)
- **Database:** PostgreSQL
- **Build/Dev:** Maven, Node.js (LTS), Angular CLI

---

## 📁 Project Structure (example)

---

## ✅ Prerequisites

- **Java 21**
- **Maven** 3.9+
- **Node.js** 18+ (LTS) & **npm**
- **PostgreSQL** 13+

---

## ⚙️ Configuration

Update Spring Boot DB settings in `src/main/resources/application.properties` (or `.yml`):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/outdoor
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update         # or validate / none (per env)
spring.jpa.show-sql=false


🚀 Run Locally
1) Clone
git clone https://github.com/<username>/kar-aoutdoor.git
cd kar-aoutdoor

2) Start Backend (Spring Boot)
# from repo root
./mvnw spring-boot:run
# or
mvn spring-boot:run


Backend defaults (example):

Base URL: http://localhost:8080

Health: GET /actuator/health (if Actuator is included)

3) Start Frontend (Angular 18)
cd kar-outdoor-ui
npm install
npm start           # typically runs: ng serve --open
# app at http://localhost:4200

🔌 API (Sample Endpoints)

Base: http://localhost:8080/api

Products

GET    /api/products
GET    /api/products/{id}
POST   /api/products              # body: { name, price, stock, ... }
PUT    /api/products/{id}
DELETE /api/products/{id}


Cart

GET    /api/cart                  # current cart
POST   /api/cart                  # { productId, quantity }
PUT    /api/cart/items/{itemId}   # { quantity }
DELETE /api/cart/items/{itemId}


Checkout / Orders

POST   /api/checkout              # creates order from cart
GET    /api/orders/{id}
GET    /api/orders?userId={uid}


Example: Create Product

POST /api/products
Content-Type: application/json

{
  "name": "4-Season Expedition Tent",
  "price": 1499.90,
  "stock": 20,
  "description": "Snow & wind ready.",
  "category": "tents",
  "imageUrl": "https://..."
}
