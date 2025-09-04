import { body } from "express-validator";

export const tagValidator = [
  body("name")
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres"),
];