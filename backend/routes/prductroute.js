const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');
const Product = require('../models/product');





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, price, quantity } = req.body;
        const image = req.file.path;

        const newProduct = new Product({ title, price, quantity, image });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT update a product
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, price, quantity } = req.body;
        const image = req.file ? req.file.path : undefined;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, price, quantity, image },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
