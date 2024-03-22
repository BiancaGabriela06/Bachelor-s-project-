import express from "express";
import { calculate } from "../controllers/travelco2.js";


const router = express.Router()

router.post('/calculate', calculate)


export default router;