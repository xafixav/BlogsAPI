const JWT = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'my_secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => JWT.sign(data, secret, jwtConfig);

const validate = (token) => JWT.verify(token, secret, jwtConfig);

const decode = (token) => JWT.decode(token);

const getUserIdByToken = async (token) => {
  const { email } = decode(token);
  const { id } = await Users.findOne({ where: { email } });
  return { id };
};

const getUserEmailByToken = async (token) => {
  const { email } = decode(token);

  return { email };
};

const validateToken = (token) => {
  try {
    const result = validate(token);
    return result;
  } catch (e) {
    return false;
  }
};

module.exports = {
  createToken,
  validate,
  decode,
  getUserIdByToken,
  getUserEmailByToken,
  validateToken,
};