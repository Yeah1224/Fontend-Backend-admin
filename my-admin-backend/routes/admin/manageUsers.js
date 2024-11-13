const express = require('express');
const router = express.Router();
const db = require('../../db'); 

router.get('/', async (req, res) => {
  try {
    db.query('SELECT * FROM account', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch accounts', details: error.message });
      }
      res.json(results);  // Trả về kết quả
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch accounts', details: error.message });
  }
});

// Endpoint xóa người dùng
router.delete('/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;

    const [result] = await db.execute(
      'DELETE FROM account WHERE acc_id = ?',
      [accountId]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'Account not found' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;