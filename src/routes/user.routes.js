import { Router } from "express";
import { userValidator } from "../middlewares/user.validator.js";
import { validateRequest } from "../middlewares/validate.request.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";


const router = Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", userValidator, validateRequest, createUser);
router.put("/:id", authMiddleware, userValidator, validateRequest, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;