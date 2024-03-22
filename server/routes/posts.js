import express from "express";
import {addComment, deleteComment, imagesUser, insertPost, showComments, userPosts} from "../controllers/posts.js"


const router = express.Router()

router.post('/sharepost', insertPost)
router.get('/userposts', userPosts)
router.get('/images', imagesUser)
router.get('/showcomments', showComments)
router.post('/addComment', addComment);
router.delete('/deletecomment/:id', deleteComment);

export default router;