const Sequelize = require('sequelize');
const schema = require('../schemas/blogPost');
const { BlogPost, Users, Categories } = require('../models');
const postsCategoriesService = require('./postsCategories');
const jwtUtilty = require('./jwt');

const postCategoriesPattern = [
  {
    model:
    Users,
    as: 'user',
    attributes: { exclude: 'password' },
  },
  {
    model:
    Categories,
    as: 'categories',
    attributes: { exclude: ['PostCategories'] },
    through: { attributes: [] },
  },
];

const create = async (data, token) => {
  const { title, categoryIds, content } = data;
  const { id } = await jwtUtilty.getUserIdByToken(token);
  const post = await BlogPost.create({ title, content, userId: id });
  const { id: postId } = post;
  await postsCategoriesService.create({ postId, categoryIds });
  return { ...post.dataValues, userId: id };
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll(
    { include: 
      [{ model: Users,
          as: 'user' },
        {
          model: Categories,
          as: 'categories',
        }] },
);

    return allPosts;
};

const getById = async (id) => {
  const postById = await BlogPost.findByPk(id,
    { include: 
      [{ model: Users,
          as: 'user' },
        {
          model: Categories,
          as: 'categories',
        }] });

    return postById;
};

const blogPostJOI = (data) => schema.blogPost.validate(data);

const isNotTheOwner = async (postId, token) => {
  const { email } = await jwtUtilty.getUserEmailByToken(token);

  const { id } = await Users.findOne({ where: { email } });
  const { userId } = await BlogPost.findByPk(postId);

  return (id !== userId);
};

const blogPostJOIUpdate = (data) => schema.blogPostUpdate.validate(data);

const update = async (data, id) => {
  await BlogPost.update(data, { where: { id } });

  const postUpdated = await BlogPost.findByPk(id, {
     include: {
       model: Categories,
       as: 'categories',
     },
  });

  return postUpdated;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });

  return null;
};

const getPostByText = async (text) => {
  const { Op } = Sequelize;
  const posts = BlogPost.findAll({
    where: {
      [Op.or]: [{
        title: { [Op.like]: `%${text}%` },

      }, {
        content: { [Op.like]: `%${text}%` },
      },
      ],
    },
    include: postCategoriesPattern,
    attributes: { exclude: 'UserId' },
  });
  return posts;
};

module.exports = {
  create,
  blogPostJOI,
  getAll,
  getById,
  isNotTheOwner,
  blogPostJOIUpdate,
  update,
  deletePost,
  getPostByText,
};