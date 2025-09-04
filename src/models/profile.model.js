import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

// Relaciones
User.hasOne(Profile, { foreignKey: "user_id", as: "profile", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });