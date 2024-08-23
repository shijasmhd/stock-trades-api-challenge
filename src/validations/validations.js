const Joi = require('joi');

const tradeSchema = Joi.object({
  type: Joi.string().valid('buy', 'sell').required(),
  user_id: Joi.number().integer().required(),
  symbol: Joi.string().required(),
  shares: Joi.number().integer().min(1).max(100).required(),
  price: Joi.number().required(),
});

const userSchema = Joi.object({
  mailId: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  tradeSchema,
  userSchema
};