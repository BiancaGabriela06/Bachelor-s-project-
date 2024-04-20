import React, { useState } from 'react';
import { Button, Drawer } from '@mui/material';
import Days from "./Days"

const Itinerary = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
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
      >
       
      <Days/>
      </Drawer>
    </>
  );
};

export default Itinerary;
