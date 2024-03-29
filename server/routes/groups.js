import express from "express";
import { needgroup } from "../controllers/groups.js";
const router = express.Router()

router.get("/needgroup", needgroup)

export default router;