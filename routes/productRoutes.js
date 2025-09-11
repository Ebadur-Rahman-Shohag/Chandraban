const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
    createProduct,
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
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
router.post("/", upload.single("image"), createProduct);

// Get all products
router.get("/", getAllProducts);

// Get featured products
router.get("/featured", getFeaturedProducts);

// Get single product
router.get("/:id", getProductById);

// Update product (with optional image upload)
router.put("/:id", upload.single("image"), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
