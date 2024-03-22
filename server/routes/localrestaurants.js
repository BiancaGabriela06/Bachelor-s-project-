import express from "express";
import { localrestaurants } from "../controllers/localrestaurants.js";

const router = express.Router()

router.get('/localrestaurants', localrestaurants)


export default router;