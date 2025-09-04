import { Router } from "express";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { tagValidator } from "../middlewares/tag.validator.js";
import { validateRequest } from "../middlewares/validate.request.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllTags);
router.get("/:id", getTagById);
router.post("/", authMiddleware, adminMiddleware, tagValidator, validateRequest, createTag);
router.put("/:id", authMiddleware, adminMiddleware, tagValidator, validateRequest, updateTag);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTag);

export default router;