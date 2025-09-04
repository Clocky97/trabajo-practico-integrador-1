import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { profileValidator } from "../middlewares/profile.validator.js";
import { validateRequest } from "../middlewares/validate.request.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, profileValidator, validateRequest, updateProfile);

export default router;