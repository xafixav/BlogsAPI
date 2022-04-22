const createObj = (DataTypes) => ({
  postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
});

module.exports = (sequelize, DataTypes) => {
 const PostsCategories = sequelize.define('PostsCategories', createObj(DataTypes), {
    timestamps: false,
  });

  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(
      models.BlogPost,
      { foreignKey: 'categoryId', otherKey: 'postId', through: PostsCategories, as: 'posts' },
    );
    models.BlogPost.belongsToMany(
      models.Categories,
      { foreignKey: 'postId', otherKey: 'categoryId', through: PostsCategories, as: 'categories' },
    );
  };
  return PostsCategories;
};