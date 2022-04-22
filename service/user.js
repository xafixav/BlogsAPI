const JWT = require('./jwt');
const schema = require('../schemas/user');
const { Users } = require('../models');

const create = async (data) => {
  const { email, password } = data;

  await Users.create(data);

  const token = JWT.createToken({ email, password });
  return token;
};

const login = async (data) => {
  const { email, password } = data;

  const token = JWT.createToken({ email, password });
  return token;
};

const doesUserExists = async (email) => {
  const UserExists = await Users.findOne({ where: { email }, attributes: { exclude: 'password' } });

  return UserExists;
};

const getAllUsers = async () => {
  const allUsers = await Users.findAll({ attributes: { exclude: 'password' } });

  return allUsers;
};

const userJOI = (obj) => schema.user.validate(obj);

const loginJOI = (obj) => schema.login.validate(obj);

const getUser = async (id) => {
  const user = await Users.findOne({ where: { id } });

  return user;
};

const deleteUser = async (token) => {
  const { id } = await JWT.getUserIdByToken(token);
  await Users.destroy({ where: { id } });

  return null;
};

module.exports = { 
  create,
  login,
  doesUserExists,
  userJOI,
  loginJOI,
  getAllUsers,
  getUser,
  deleteUser,
};