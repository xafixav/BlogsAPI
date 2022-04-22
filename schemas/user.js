const Joi = require('joi');

const user = Joi.object({
  displayName: Joi.string()
  .min(8)
  .required()
  .messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().min(6).required()
  .invalid('')
  .messages({
    'string.min': '"password" length must be 6 characters long',
    'any.invalid': '"password" is not allowed to be empty',
  }),
  image: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().min(6).required()
  .invalid('')
  .messages({
    'string.min': '"password" length must be 6 characters long',
    'any.invalid': '"password" is not allowed to be empty',
  }),
});

module.exports = { user, login };