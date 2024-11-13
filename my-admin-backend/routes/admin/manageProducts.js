const express = require('express');
const router = express.Router();
const db = require('../../db'); 

// Endpoint hiển thị danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Endpoint thêm sản phẩm mới
router.post('/', async (req, res) => {
  try {
    const { product_name, cost, description, quantity, size_id, cate_id, brand_id, imageUrl } = req.body;

    if (!product_name || !cost || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.execute(
      'INSERT INTO products (product_name, cost, description, quantity, size_id, cate_id, brand_id, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [product_name, cost, description, quantity, size_id, cate_id, brand_id, imageUrl]
    );

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Product added successfully' });
    } else {
      res.status(500).json({ error: 'Failed to add product' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Endpoint sửa sản phẩm
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { product_name, cost, description, quantity, size_id, cate_id, brand_id, imageUrl } = req.body;

    if (!product_name || !cost || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.execute(
      'UPDATE products SET product_name = ?, cost = ?, description = ?, quantity = ?, size_id = ?, cate_id = ?, brand_id = ?, imageUrl = ? WHERE product_id = ?',
      [product_name, cost, description, quantity, size_id, cate_id, brand_id, imageUrl, productId]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Endpoint xóa sản phẩm
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const [result] = await db.execute(
      'DELETE FROM products WHERE product_id = ?',
      [productId]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;