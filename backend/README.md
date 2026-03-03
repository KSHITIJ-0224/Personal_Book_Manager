# Personal Book Manager - Backend API

A robust and secure RESTful API built with **Node.js**, **Express**, and **MongoDB**. This backend serves as the core logic and data persistence layer for the Personal Book Manager application.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Morgan (HTTP Request Logger)
- **Security**: CORS, Bcrypt.js for password hashing

## 🚀 Key Features

### 1. Secure Authentication
- **JWT Implementation**: Stateless authentication using bearer tokens.
- **Password Hashing**: Securely stores user credentials using industry-standard salting and hashing.
- **Route Protection**: Custom `protect` middleware ensures only authorized users can access sensitive data.

### 2. High-Performance CRUD
- **Book Management**: Specialized controllers for adding, fetching, updating, and deleting books.
- **Data Integrity**: Enforced schemas with validation rules for required fields and specific book statuses.
- **User-Based Scoping**: Data is automatically filtered to ensure users only see and modify their own book collections.

### 3. Professional Architecture
The backend follows a strict Controller-Route-Model pattern to ensure scalability and maintainability.

## 📁 Professional Directory Structure

```text
backend/
├── config/             # Database configuration (MongoDB Connection)
├── controllers/        # Logical request handlers
│   ├── authController.js # Handles login/registration logic
│   └── bookController.js # Handles book management (CRUD)
├── middleware/         # Custom request filters
│   └── authMiddleware.js # JWT verification and user population
├── models/             # Mongoose Schemas & Models
│   ├── User.js         # User registration/auth schema
│   └── Book.js         # Book metadata and status schema
├── routes/             # Express Route Definitions
│   ├── authRoutes.js   # Authentication endpoints
│   └── bookRoutes.js   # Book collection endpoints
├── .env                # Sensitive environment variables
├── server.js           # Application entry point & middleware stack
└── package.json        # Dependencies and start scripts
```

## 🚥 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Create a new user account | Public |
| **POST** | `/api/auth/login` | Authenticate and get JWT token | Public |
| **GET** | `/api/books` | Get all books for the user | Private |
| **POST** | `/api/books` | Add a new book to the collection | Private |
| **PUT** | `/api/books/:id` | Update book status/details | Private |
| **DELETE** | `/api/books/:id`| Remove a book from collection | Private |

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_generated_64byte_hex_string
PORT=5000
```

## 🏁 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate a secure `JWT_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. Start the server:
   ```bash
   npm start
   ```

---
*Architected for reliability, security, and developer clarity.*
