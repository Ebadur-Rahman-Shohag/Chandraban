# Chandraban Server

A robust Node.js RESTful API for product management, built with Express, MongoDB (Mongoose), and Multer for secure image uploads.

---

## 🚀 Features
- **CRUD Operations:** Create, read, update, and delete products
- **Image Uploads:** Upload product images (PNG only, secure storage)
- **Featured Products:** Mark and retrieve featured products
- **Environment Variables:** Secure configuration with dotenv
- **Consistent API Responses:** Standardized response structure for easy frontend integration

---

## 🗂️ Project Structure
```
├── controllers/
│   └── productController.js
├── db/
│   └── connectDB.js
├── models/
│   └── productModel.js
├── routes/
│   └── productRoutes.js
├── uploads/           # Uploaded images (PNG only)
├── .env               # Environment variables
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Setup & Installation
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Chandraban-Server
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. **Create an `uploads/` directory** in the root folder for image uploads.
5. **Start the server**
   ```bash
   npm start
   ```

---

## 📚 API Documentation

### Product Endpoints
| Method | Endpoint                        | Description                              |
|--------|----------------------------------|------------------------------------------|
| POST   | `/api/v1/products`              | Create a product (PNG image upload)      |
| GET    | `/api/v1/products`              | Get all products                         |
| GET    | `/api/v1/products/featured`     | Get all featured products                |
| GET    | `/api/v1/products/:id`          | Get a single product by ID               |
| PUT    | `/api/v1/products/:id`          | Update a product (optional PNG upload)   |
| DELETE | `/api/v1/products/:id`          | Delete a product                         |

#### Example: Create Product
- **Form Data:**
  - `name` (string, required)
  - `description` (string, required)
  - `price` (number, required)
  - `productCode` (string, required)
  - `isFeatured` (boolean, optional)
  - `image` (file, PNG only, required)

#### Example Response
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "...",
    "name": "...",
    "description": "...",
    "price": 100,
    "productCode": "...",
    "isFeatured": false,
    "image": "...png"
  }
}
```

---

## 📝 Notes
- Only PNG images are accepted for product uploads.
- All API responses follow a standard structure: `{ success, message, data, count }`.
- Ensure your MongoDB user has the correct permissions and your IP is whitelisted.
- The `uploads/` directory is gitignored for security.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the ISC License.
