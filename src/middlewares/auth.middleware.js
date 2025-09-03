import { verifyToken } from "../helpers/jwt.helper.js";
import { User } from "../models/user.model.js";
import { Article } from "../models/article.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Acceso solo para administradores" });
};

export const ownerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }
    // Diferencia entre admin y dueño
    if (req.user.role === "admin" || article.user_id === req.user.id) {
      return next();
    }
    return res.status(403).json({ message: "No tienes permiso para esta acción" });
  } catch (error) {
    return res.status(500).json({ message: "Error de autorización", error });
  }
};