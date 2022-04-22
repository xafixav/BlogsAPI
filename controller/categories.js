const { StatusCodes } = require('http-status-codes');
const categoriesService = require('../service/categories');

const create = async (req, res, next) => {
  try {
    const result = await categoriesService.createCategories(req.body);
  
    return res.status(StatusCodes.CREATED).json(result);
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const result = await categoriesService.getAllCategories();
  
    return res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAllCategories,
};