const { StatusCodes } = require('http-status-codes');
const userService = require('../service/user');

const create = async (req, res, next) => {
  try {
    const tokenUser = await userService.create(req.body);
    return res.status(StatusCodes.CREATED).json({ token: tokenUser });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const tokenUser = await userService.login(req.body);
    return res.status(StatusCodes.OK).json({ token: tokenUser });    
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    return res.status(StatusCodes.OK).json(allUsers);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    await userService.deleteUser(token);
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
};