import express from "express";
import {changePassword, changeUserInfo, userInfo } from "../controllers/users.js"


const router = express.Router()

router.post('/changePassword', changePassword)
router.post('/changeuserinfo', changeUserInfo)
router.get('/userinfo', userInfo);

export default router;