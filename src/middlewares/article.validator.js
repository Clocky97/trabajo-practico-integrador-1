import { body } from "express-validator";

export const articleValidator = [
  body("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .notEmpty().withMessage("El contenido es obligatorio")
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),
  body("user_id")
    .notEmpty().withMessage("El usuario es obligatorio")
    .isInt().withMessage("El usuario debe ser un número entero"),
];