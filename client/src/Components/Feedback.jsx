import React, {useState} from 'react'
import {Button, Drawer} from "@mui/material";

const Feedback = () => {
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
          bottom: '60px',
          right: '20px',
          zIndex: 999, // Ensure it's above other content
        }}
      >
        Give a feedback!
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        style={{ width: '1000px' }}
      >
    
      </Drawer>
    </>
  );
}

export default Feedback