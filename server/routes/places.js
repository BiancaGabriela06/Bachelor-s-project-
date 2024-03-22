import express from "express";
import { getCities, getCountries, listofcities,  } from "../controllers/places.js";


const router = express.Router()

router.get('/getcities', getCities);
router.get('/getcountries', getCountries);
router.get('/listofcities', listofcities);

export default router;