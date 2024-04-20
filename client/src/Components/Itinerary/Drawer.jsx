import React, { useState } from 'react';

const Drawer = ({ onSave }) => {
  const [itinerary, setItinerary] = useState('');

  const handleChange = (event) => {
    setItinerary(event.target.value);
  };

  const handleSave = () => {
    onSave(itinerary);
    setItinerary('');
  };

  return (
    <div className="drawer">
      <textarea value={itinerary} onChange={handleChange} rows="10" cols="30" />
      <button onClick={handleSave}>Save Itinerary</button>
    </div>
  );
};

export default Drawer;
