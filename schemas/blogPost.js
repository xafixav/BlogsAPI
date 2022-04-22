const Joi = require('joi');

const blogPost = Joi.object({
  title: Joi.string()
  .required(),
  categoryIds: Joi.array()
  .required(),
  content: Joi.string()
  .required(),
});

const blogPostUpdate = Joi.object({
  title: Joi.string()
  .required(),
  categoryIds: Joi.array()
  .forbidden()
  .messages({
    'any.unknown': 'Categories cannot be edited', 
  }),
  content: Joi.string()
  .required(),
});

module.exports = {
  blogPost,
  blogPostUpdate,
};