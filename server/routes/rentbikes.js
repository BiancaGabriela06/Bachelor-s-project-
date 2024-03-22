import express from "express";
import { rentbikes } from "../controllers/rentbikes.js";

const router = express.Router()

router.get('/rentbikes', rentbikes)


export default router;