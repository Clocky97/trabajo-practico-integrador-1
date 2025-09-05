import { Tag } from "../models/tag.model.js";
import { Article } from "../models/article.model.js";

// Obtener todas las etiquetas

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener etiquetas", error });
  }
};

// Obtener una etiqueta por ID

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [{ model: Article, as: "articles" }],
    });
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la etiqueta", error });
  }
};

// Crear una nueva etiqueta

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la etiqueta", error });
  }
};

// Actualizar una etiqueta existente

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    tag.name = name;
    await tag.save();
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la etiqueta", error });
  }
};

// Eliminar una etiqueta

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    await tag.destroy();
    res.status(200).json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la etiqueta", error });
  }
};