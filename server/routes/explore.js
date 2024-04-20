import express from "express";
import { getArticles,getComments, addComment, deleteComment } from "../controllers/explore.js";

const router = express.Router()

router.get('/articles', getArticles);
router.get('/article/showcomments', getComments)
router.post('/article/addComment', addComment);
router.delete('/article/deletecomment/:id', deleteComment);

export default router;