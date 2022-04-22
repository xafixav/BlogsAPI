const createObj = (sequelize, DataTypes) => ({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

module.exports = (sequelize, DataTypes) => {
 const BlogPost = sequelize.define('BlogPost', createObj(sequelize, DataTypes), {
  timestamps: false,
});

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};