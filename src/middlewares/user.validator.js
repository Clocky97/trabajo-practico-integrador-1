import { body } from "express-validator";

export const userValidator = [
  body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/).withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[A-Z]/).withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[0-9]/).withMessage("La contraseña debe tener al menos un número"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'"),
];