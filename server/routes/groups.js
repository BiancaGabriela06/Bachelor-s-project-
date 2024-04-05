import express from "express";
import { needgroup, getGroups, joinGroup,getGroupUser } from "../controllers/groups.js";
const router = express.Router()

router.get("/needgroup", needgroup)
router.get('/groups', getGroups)
router.post('/join', joinGroup);
router.get('/groupuser', getGroupUser)


export default router;