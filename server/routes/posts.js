import express from "express";
import {addComment, deleteComment, imagesUser, increaseLikes, insertPost, posts, showComments, userPosts} from "../controllers/posts.js"


const router = express.Router()

router.post('/sharepost', insertPost)
router.get('/userposts', userPosts)
router.get('/images', imagesUser)
router.get('/showcomments', showComments)
router.post('/addComment', addComment);
router.delete('/deletecomment/:id', deleteComment);
router.get('/getposts', posts)
router.post('/increaselikes', increaseLikes)

export default router;