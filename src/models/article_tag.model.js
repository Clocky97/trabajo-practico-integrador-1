import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const ArticleTag = sequelize.define("ArticleTag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relaciones

Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
});
Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
});