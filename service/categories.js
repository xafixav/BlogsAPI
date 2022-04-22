const schema = require('../schemas/categories');
const { Categories } = require('../models');

const categoryJOI = (data) => schema.category.validate(data);

const createCategories = async (data) => {
  const categoryCreated = await Categories.create(data);

  return categoryCreated;
};

const getAllCategories = async () => {
  const allCategories = await Categories.findAll();

  return allCategories;
};

const validateArrCategories = async (categoriesIdsArray) => {
  const allCategories = await getAllCategories();
  const allCategoriesExists = allCategories.map(({ id }) => categoriesIdsArray.includes(id));

  return allCategoriesExists.some((boolean) => boolean === true);
};

module.exports = {
  categoryJOI,
  createCategories,
  getAllCategories,
  validateArrCategories,
};