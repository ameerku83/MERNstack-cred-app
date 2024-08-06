const Product = require('../models/product');

const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const product = new Product({ title, price, description, image: req.file.path });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Product creation failed' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const image = req.file ? req.file.path : '';
    const id=req.params.id
    await Product.findByIdAndUpdate(id,{ title, price, description, image },{ new:true });

    
    
   
    
    res.json({message:"product updted"});
  } catch (error) {
    res.status(500).json({ error: 'Product update failed' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

const deleteProduct=async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { createProduct, updateProduct, getProducts, getProduct,deleteProduct };
