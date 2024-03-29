import express from "express";
import { postArticle, postArticleImages } from "../controllers/dashboard.js";

const router = express.Router()


router.post('/article', postArticle);
router.post('/article/images', postArticleImages)
export default router;