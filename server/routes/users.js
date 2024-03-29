import express from "express";
import {changePassword, changeUserInfo, editInfo, isAdmin, userInfo } from "../controllers/users.js"


const router = express.Router()

router.post('/changePassword', changePassword)
router.post('/changeuserinfo', changeUserInfo)
router.get('/userinfo', userInfo);
router.get('/isAdmin', isAdmin);
router.put('/editinfo', editInfo)

export default router;