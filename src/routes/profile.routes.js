import { Router } from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";
import { profileValidator } from "../middlewares/profile.validator.js";
import { validationResult } from "express-validator";

const router = Router();

// Middleware para manejar los errores de validación
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

router.post("/", profileValidator, handleValidation, createProfile);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.put("/:id", profileValidator, handleValidation, updateProfile);
router.delete("/:id", deleteProfile);

export default router;