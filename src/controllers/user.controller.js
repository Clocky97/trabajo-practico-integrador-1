import { User } from "../models/user.model.js";
import { Article } from "../models/article.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Article, as: "articles" }],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Article, as: "articles" }],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};