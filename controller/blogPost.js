const { StatusCodes } = require('http-status-codes');
const blogPostService = require('../service/blogPost');

const create = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const result = await blogPostService.create(req.body, token);
  
    return res.status(StatusCodes.CREATED).json(result);
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await blogPostService.getAll();
    
    return res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await blogPostService.getById(id);
    
    return res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updated = await blogPostService.update({ title, content }, id);

    return res.status(StatusCodes.OK).json(updated);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params; 
    await blogPostService.deletePost(id);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

const getPostByQuery = async (req, res, next) => {
  try {
    const { q } = req.query;
    const posts = await blogPostService.getPostByText(q);
    return res.status(StatusCodes.OK).json(posts);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  getPostByQuery,
};