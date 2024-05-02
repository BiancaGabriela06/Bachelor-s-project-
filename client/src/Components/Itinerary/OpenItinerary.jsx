import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';
import Days from "./Days"

const OpenItinerary = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999, // Ensure it's above other content
        }}
      >
        Open Itinerary
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        style={{ width: '1000px' }}
      >
       
      <Days/>
      </Drawer>
    </>
  );
};

export default OpenItinerary;
