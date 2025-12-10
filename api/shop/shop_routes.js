const express = require('express');
const router = express.Router();

const Product = require('./models/product');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ products: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json({ product: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST to create a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock, category } = req.body;
        
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Name, description, and price are required' });
        }

        const product = await Product.create({
            name,
            description,
            price,
            imageUrl,
            stock: stock || 0,
            category
        });

        res.status(201).json({ 
            message: 'Product created successfully',
            product: product
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT to update an existing product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl, stock, category } = req.body;
        
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update({
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            imageUrl: imageUrl || product.imageUrl,
            stock: stock !== undefined ? stock : product.stock,
            category: category || product.category
        });

        res.json({ 
            message: 'Product updated successfully',
            product: product
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
