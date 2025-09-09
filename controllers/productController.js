const Product = require("../models/productModel");
const path = require("path");

// Create product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        // Only allow PNG
        if (path.extname(req.file.originalname).toLowerCase() !== ".png") {
            return res.status(400).json({ message: "Only PNG images are allowed" });
        }
        const image = req.file.filename;
        const product = new Product({ name, description, price, image });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get featured products (example: top 5 by price)
exports.getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ price: -1 }).limit(5);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let updateData = { name, description, price };
        if (req.file) {
            // Only allow PNG
            if (path.extname(req.file.originalname).toLowerCase() !== ".png") {
                return res.status(400).json({ message: "Only PNG images are allowed" });
            }
            updateData.image = req.file.filename;
        }
        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};