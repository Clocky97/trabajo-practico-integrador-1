import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";

// Obtener todos los artículos

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: User, as: "author" }],
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener artículos", error });
  }
};

// Obtener un artículo por ID

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, {
      include: [{ model: User, as: "author" }],
    });
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artículo", error });
  }
};

// Crear un nuevo artículo

export const createArticle = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    const newArticle = await Article.create({ title, content, user_id });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el artículo", error });
  }
};

// Actualizar un artículo existente

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }
    article.title = title;
    article.content = content;
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el artículo", error });
  }
};

// Eliminar un artículo

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }
    await article.destroy();
    res.status(200).json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el artículo", error });
  }
};