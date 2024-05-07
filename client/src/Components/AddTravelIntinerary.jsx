import React from "react"
import {Grid, TextField, Typography, Button} from '@mui/material';
import { useState } from "react";
import "../Styling/AddTravelIntinerary.css"
import axios from "axios"
import { green } from '@mui/material/colors';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PushPinIcon from '@mui/icons-material/PushPin';


const AddTravelIntinerary = () => {
    const [days, setDays] = useState([]);
    const [message, setMessage] = useState("")


    const generateDay = () => {
        // Generate an array of hours for a day
        const hours = Array.from({ length: 24 }, (_, index) => ({
          startTime: `${index}:00`,
          endTime: `${index + 1}:00`,
          value: '', // You can add other properties as needed
        }));
    
        // Add the generated day to the state
        setDays([...days, { hours }]);
      };

   const saveTrip = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/trip/addintinerary',days)
        .then( res => {
                if(res.data.Status === 'Success'){
                        setMessage("Trip added");
                }
                else{
                        setMessage("Something went wrong. Please check all fields.");
                }

                     
        }

        )
   } 

   return (
    <Grid container spacing={6}>
        <Grid item >
                <TextField id="standard-basic" label="Where to?" variant="standard" />
                <TextField id="standard-basic" label="How many days?" variant="standard" />
                <TextField id="standard-basic" label="Purpose" variant="standard" />
                <TextField id="standard-basic" label="Trip Start" variant="standard" />
                <TextField id="standard-basic" label="Trip End" variant="standard" />
        </Grid>
        <Grid item xs = {8} spacing={6}>
                <Button onClick={generateDay}>
                    <CalendarTodayIcon sx={{ color: green[500] }}/> Add Day trip
                </Button>
                <Button onClick={saveTrip}>
                        <PushPinIcon/>Save Trip Plan
                </Button>
                {message && message}
        </Grid>
        <Grid item xs = {8} spacing={6}>
                <div className="days-container">
                        {days.map((day, index) => (
                        <Grid item >
                        <div key={index} className="day-column">
                                <h3>Day {index + 1}</h3>
                                {day.hours.map((hour, hourIndex) => (
                                <div key={hourIndex}>
                                        <label>
                                        {hour.startTime} - {hour.endTime}:
                                        <input
                                        type="text"
                                        value={hour.value}
                                        onChange={(e) => {
                                        // Handle input changes and update the state
                                        const newDays = [...days];
                                        newDays[index].hours[hourIndex].value = e.target.value;
                                        setDays(newDays);
                                        }}
                                        />
                                        </label>
                                </div>
                        ))}
                        </div>
                        </Grid>
                        ))}
                </div>
                   
                </Grid>
        <Grid item xs = {8} spacing={3}>
                        <Typography variant="h4" component="h2">
                        Notes from trip
                        </Typography>
                        <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={10}
                        variant="standard"
                        defaultValue="Restaurants, places to visit...."
                        />
        </Grid>
        
    </Grid>

   ) 
}

export default AddTravelIntinerary;