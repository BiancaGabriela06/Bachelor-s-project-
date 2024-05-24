import React from 'react';
import {Alert, Typography,IconButton} from  '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const Notification = ({itinerary,  onClose }) => {

    const currentDate = new Date();
    const startDate = new Date(itinerary.start_date);
    const timeDifference = startDate.getTime() - currentDate.getTime();
    const daysUntilTrip = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return (
      <>
      <Alert sx={{marginLeft: '4rem', 
                  marginRight: '4.5rem',
                  position: 'fixed',
                  bottom: '20px',
            
                  zIndex: 999}}
         severity="info">
        <IconButton size="large" sx={{ position: 'relative', marginLeft: '37rem' }} onClick={onClose}><CancelPresentationIcon/></IconButton>
        <Typography variant="h3" sx={{textAlign: 'center' }} >Upcoming Trip: {itinerary.title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center'  }} >Days Until Trip: {daysUntilTrip}</Typography>
      </Alert>
      </>
    );
  };
export default Notification;