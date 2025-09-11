const Product = require("../models/productModel");
const path = require("path");

// Create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, productCode } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }
        // Only allow PNG
        if (path.extname(req.file.originalname).toLowerCase() !== ".png") {
            return res.status(400).json({ success: false, message: "Only PNG images are allowed" });
        }
        const image = req.file.filename;
        const product = { name, description, price, image, productCode };
        await Product.create(product);
        res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, productCode, isFeatured } = req.body;
        let updateData = { name, description, price, productCode, isFeatured };
        if (req.file) {
            // Only allow PNG
            if (path.extname(req.file.originalname).toLowerCase() !== ".png") {
                return res.status(400).json({ success: false, message: "Only PNG images are allowed" });
            }
            updateData.image = req.file.filename;
        }
        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    updateProduct,
    deleteProduct,
};