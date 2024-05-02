import express from "express";
import {deleteItinerary, getItineraries, getItinerary, getPossibleItinerary, insertItinerary, soonestTrip, updateItinerary, updatePossibleItinerary } from "../controllers/itinerary.js";
const router = express.Router()

router.get('/possibleitinerary', getPossibleItinerary);
router.put('/updatepossibleitinerary/:id', updatePossibleItinerary );
router.post('/insertitinerary', insertItinerary)
router.get('/getitineraries', getItineraries)
router.get('/getitinerary/:itineradyid', getItinerary)
router.delete('/deleteitinerary/:itineraryid', deleteItinerary);
router.put('/updateitinerary/:id', updateItinerary);
router.get('/soonesttrip', soonestTrip);

export default router; 