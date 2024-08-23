const db = require('./db.js');

const addTrade = (tradeObj) => {
  return db.trade.create({
    data: tradeObj
  });
}

// TODO: Use pagination if needed
const getTradeDetails = (type, user_id) => {
  const where = {};

  if (type) where.type = type;
  if (user_id) where.user_id = user_id;

  return db.trade.findMany({
    where,
    orderBy: {trade_id: 'asc'}
  });
};

const getTradeById = (trade_id) => {
  return db.trade.findUnique({
    where: {trade_id}
  });
};

module.exports = {
  addTrade,
  getTradeDetails,
  getTradeById
}