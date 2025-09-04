import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { registerValidator } from "../middlewares/auth.validator.js";
import { validateRequest } from "../middlewares/validate.request.js";

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", login);
router.post("/logout", logout);

export default router;