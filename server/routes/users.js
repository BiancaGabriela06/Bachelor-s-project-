import express from "express";
import {changePassword, changeUserInfo, editInfo, getUserId, getUsers, get_userdata, get_usergroup, isAdmin, userInfo } from "../controllers/users.js"


const router = express.Router()

router.post('/changePassword', changePassword)
router.post('/changeuserinfo', changeUserInfo)
router.get('/userinfo', userInfo);
router.get('/isAdmin', isAdmin);
router.put('/editinfo', editInfo)
router.get('/getusers', getUsers)
router.get('/getuser', get_userdata)
router.get('/getusergroups', get_usergroup)
router.get('/getuserid', getUserId)

export default router;