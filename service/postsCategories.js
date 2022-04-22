const { PostsCategories } = require('../models');

const create = async (data) => {
  const { postId, categoryIds } = data;
  const postsPromises = categoryIds.map((categoryId) => 
  PostsCategories.create({ postId, categoryId }));
  const postsCreateds = await Promise.all(postsPromises);

  return postsCreateds;
};

module.exports = {
  create,
};