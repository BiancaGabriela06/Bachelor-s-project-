import express from "express";
import { getGroups, postArticle, joinGroup, postArticleImages, postGroup, getGroupUser } from "../controllers/dashboard.js";

const router = express.Router()


router.post('/article', postArticle);
router.post('/article/images', postArticleImages)
router.post('/group', postGroup)
router.get('/groups', getGroups)
router.post('/groups/join', joinGroup);
router.get('/groupuser', getGroupUser)


export default router;