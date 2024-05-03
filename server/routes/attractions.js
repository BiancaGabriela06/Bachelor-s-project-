import express from "express";
import { attractions } from "../controllers/attractions.js";

const router = express.Router()

router.get('/getattractions', attractions)


export default router;