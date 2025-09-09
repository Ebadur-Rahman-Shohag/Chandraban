const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

// Multer config: store in 'uploads/' and only accept PNG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === ".png") {
        cb(null, true);
    } else {
        cb(new Error("Only PNG images are allowed"), false);
    }
};
const upload = multer({ storage, fileFilter });

// Create product (with image upload)
router.post("/", upload.single("image"), productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get single product
router.get("/:id", productController.getProductById);

// Get featured products
router.get("/featured", productController.getFeaturedProducts);

// Update product (with optional image upload)
router.put("/:id", upload.single("image"), productController.updateProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;