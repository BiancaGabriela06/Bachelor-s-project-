import React from 'react';
import {Alert, Typography, Button} from  '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const NotificationProfile = ({itinerary,  onClose }) => {

    const currentDate = new Date();
    const startDate = new Date(itinerary.start_date);
    const timeDifference = startDate.getTime() - currentDate.getTime();
    const daysUntilTrip = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return (
      <>
      <Alert sx={{marginLeft: '4rem', marginTop:'4rem', marginBottom:'4rem', marginRight: '4.5rem'}} className="notification" severity="info">
        <Button  sx={{marginLeft: '23rem', textAlign: 'center'  }} onClick={onClose}><CancelPresentationIcon/></Button>
        <Typography variant="h3" sx={{textAlign: 'center' }} >Upcoming Trip: {itinerary.title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center'  }} >Days Until Trip: {daysUntilTrip}</Typography>
      </Alert>
      </>
    );
  };
export default NotificationProfile;