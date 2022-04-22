const { StatusCodes } = require('http-status-codes');
const JWT = require('../service/jwt');
const userService = require('../service/user');
const categoriesService = require('../service/categories');
const blogPostService = require('../service/blogPost');

const validationJOIUser = (req, res, next) => {
  const { error } = userService.userJOI(req.body);
  
  if (error) {
    const { message } = error.details[0] || error;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  next();
};

const validateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await userService.doesUserExists(email);
  
    if (userExists) {
     return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const validateJOILogin = async (req, res, next) => {
  const { error } = userService.loginJOI(req.body);

  if (error) {
    const { message } = error.details[0] || error;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await userService.doesUserExists(email);
  
    if (!userExists) {
     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid fields' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  
  const resultValidation = JWT.validateToken(authorization);

  if (!resultValidation) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

const validateJOICategories = (req, res, next) => {
  const { error } = categoriesService.categoryJOI(req.body);

  if (error) {
    const { message } = error.details[0] || error;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  next();
};

const validateJOIblogPost = (req, res, next) => {
  const { error } = blogPostService.blogPostJOI(req.body);

  if (error) {
    const { message } = error.details[0] || error;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const AllCategoriesExists = await categoriesService.validateArrCategories(categoryIds);
  if (!AllCategoriesExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const validatePostExistence = async (req, res, next) => {
  const { id } = req.params;
  const result = await blogPostService.getById(id);
  
  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post does not exist' });
  }
  next();
};

const validateOwnership = async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;

  const userIsNotTheOwner = await blogPostService.isNotTheOwner(id, token);

  if (userIsNotTheOwner) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }
  next();
};

const validateJOIBlogPostUpdate = async (req, res, next) => {
  const { error } = blogPostService.blogPostJOIUpdate(req.body);

  if (error) {
    const { message } = error.details[0] || error;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = { 
  validationJOIUser,
  validateUser,
  validateJOILogin,
  validateLogin,
  validateToken,
  validateJOICategories,
  validateJOIblogPost,
  validateCategoryIds,
  validateOwnership,
  validatePostExistence,
  validateJOIBlogPostUpdate,
  
};