import { body } from "express-validator";

export const profileValidator = [
  body("first_name")
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre solo puede contener letras"),
  body("last_name")
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El apellido solo puede contener letras"),
  body("biography")
    .optional()
    .isLength({ max: 500 }).withMessage("La biografía puede tener hasta 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL().withMessage("El avatar debe ser una URL válida"),
  body("birth_date")
    .optional()
    .isISO8601().withMessage("La fecha de nacimiento debe ser una fecha válida"),
];