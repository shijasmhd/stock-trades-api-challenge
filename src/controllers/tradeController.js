const tradeModel = require('../models/trades.js');

const createTrade = (req, res) => {
  let { type, user_id, symbol, shares, price, timestamp } = req.body;

  timestamp = new Date(timestamp || Date.now());

  return tradeModel.addTrade({ type, user_id, symbol, shares, price, timestamp })
    .then(tradeObj => res.status(201).json(tradeObj))
    .catch(err => res.status(500).json({error: err.message}));
};

const getTrades = (req, res) => {
  let { user_id, type } = req.query;

  if (user_id) {
    user_id = parseInt(user_id);
  }

  return tradeModel.getTradeDetails(type, user_id)
    .then(tradeDetails => res.status(200).json(tradeDetails))
    .catch(err => res.status(500).json({error: err.message}));
};

const getTradeById = (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  return tradeModel.getTradeById(id)
    .then(tradeDetails => {
      if (tradeDetails) return res.status(200).json(tradeDetails);

      return res.status(404).json({error: 'Id not found'});
    })
    .catch(err => res.status(500).json({error: err.message}));
}

module.exports = {
  createTrade,
  getTrades,
  getTradeById
};
