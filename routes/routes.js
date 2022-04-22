const express = require('express');
const error = require('../middleware/error');
const validate = require('../middleware/validate');
const user = require('../controller/user');
const categories = require('../controller/categories');
const blogPost = require('../controller/blogPost');

const router = express.Router();

router.get('/post/search',
validate.validateToken,
blogPost.getPostByQuery);

router.post('/user',
 validate.validationJOIUser,
  validate.validateUser,
   user.create);

router.post('/login',
 validate.validateJOILogin,
  validate.validateLogin,
   user.login);

router.get('/user',
 validate.validateToken,
  user.getAllUsers);

router.get('/user/:id',
 validate.validateToken,
  user.getUserById);

router.post('/categories',
 validate.validateToken,
  validate.validateJOICategories,
   categories.create);   

router.get('/categories/',
   validate.validateToken,
    categories.getAllCategories);

router.post('/post',
 validate.validateToken,
 validate.validateJOIblogPost,
 validate.validateCategoryIds,
  blogPost.create);

  router.get('/post',
  validate.validateToken,
  blogPost.getAll);

  router.get('/post/:id',
  validate.validateToken,
  validate.validatePostExistence,
  blogPost.getById);

  router.put('/post/:id',
  validate.validateToken,
  validate.validatePostExistence,
  validate.validateJOIBlogPostUpdate,
  validate.validateOwnership,
  blogPost.update);

  router.delete('/post/:id',
  validate.validateToken,
  validate.validatePostExistence,
  validate.validateOwnership,
  blogPost.deletePost);

  router.delete('/user/me',
  validate.validateToken,
  user.deleteUser);

router.use(error);

module.exports = router;