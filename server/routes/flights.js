import express from "express";
import {  searchAirport, searchFlights } from "../controllers/flights.js";

const router = express.Router()


router.get('/searchFlights', searchFlights)
router.get('/searchAirport', searchAirport)

export default router;