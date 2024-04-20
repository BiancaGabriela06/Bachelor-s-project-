import React, { createContext, useContext, useEffect, useState } from 'react';

const TripItineraryContext = createContext();

export const useTripItinerary = () => useContext(TripItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Load itinerary from sessionStorage when the component mounts
    const savedItinerary = sessionStorage.getItem('tripItinerary');
    if (savedItinerary) {
      setDays(JSON.parse(savedItinerary));
    }
  }, []);

  const addDay = (day) => {
    setDays([...days, day]);
  };

  useEffect(() => {
    // Save itinerary to sessionStorage whenever it changes
    sessionStorage.setItem('tripItinerary', JSON.stringify(days));
  }, [days]);

  return (
    <TripItineraryContext.Provider value={{ days, addDay }}>
      {children}
    </TripItineraryContext.Provider>
  );
};
