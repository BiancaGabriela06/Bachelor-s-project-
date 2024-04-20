import React, {useState} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTripItinerary } from './ItineraryContext';

const Days = () => {
  const { days, addDay } = useTripItinerary();

  const handleAddDay = () => {
    // Logic to add a new day to the itinerary
    const newDay = {
      title: `Day ${days.length + 1}`,
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
    addDay(newDay);
  };
  
    return (
      <div>
        <Button onClick={handleAddDay} variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          Add Day
        </Button>
        {days.map((day, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{day.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{day.details}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
   );
}

export default Days;