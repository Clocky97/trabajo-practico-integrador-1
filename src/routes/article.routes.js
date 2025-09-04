import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { articleValidator } from "../middlewares/article.validator.js";
import { validateRequest } from "../middlewares/validate.request.js";
import { authMiddleware, ownerMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/", authMiddleware, articleValidator, validateRequest, createArticle);
router.put("/:id", authMiddleware, ownerMiddleware, articleValidator, validateRequest, updateArticle);
router.delete("/:id", authMiddleware, ownerMiddleware, deleteArticle);

export default router;