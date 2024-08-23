const express = require('express');
const tradeController = require('../controllers/tradeController');

const router = express.Router();

function errorHandler (req, res) {
  return res.status(405).json({error: 'Method not allowed'});
}

// Create a new trade
router.post('/', tradeController.createTrade);

// Get all trades
router.get('/', tradeController.getTrades);

// Get trade by id
router.get('/:id', tradeController.getTradeById);

// Disable all other operations
router.delete('/:id', errorHandler);
router.put('/:id', errorHandler);
router.patch('/:id', errorHandler);

module.exports = router;