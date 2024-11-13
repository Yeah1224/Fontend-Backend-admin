const express = require('express');
const router = express.Router();
const db = require('../../db'); 

// Endpoint hiển thị danh sách Admin
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM admin');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Endpoint thêm Admin mới
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.execute(
      'INSERT INTO admin (email, password) VALUES (?, ?)',
      [email, password]
    );

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Admin added successfully' });
    } else {
      res.status(500).json({ error: 'Failed to add admin' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to add admin' });
  }
});

// Endpoint sửa Admin
router.put('/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.execute(
      'UPDATE admin SET email = ?, password = ? WHERE admin_id = ?',
      [email, password, adminId]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Admin updated successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Endpoint xóa Admin
router.delete('/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;

    const [result] = await db.execute(
      'DELETE FROM admin WHERE admin_id = ?',
      [adminId]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

module.exports = router;