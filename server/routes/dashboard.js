import express from "express";
import { postArticle, postArticleImages, postGroup } from "../controllers/dashboard.js";

const router = express.Router()


router.post('/article', postArticle);
router.post('/article/images', postArticleImages)
router.post('/group', postGroup)


export default router;