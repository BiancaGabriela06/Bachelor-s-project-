import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Flights = (fromLocation, toLocation) => {
    
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        

        const fetchData = async () => {
           
            try {
                const response = await axios.get('http://localhost:3001/flights/searchAirport', { fromLocation });
                if (response.data.Status === 'Success') {
                    setFlights(response.data.Data)
                    console.log("date furnizate");
                } else {
                    console.log(response.data.err);
                }
            } catch (error) {
                console.error(error);
            }
        };

        
    fetchData();
        
    }, []);
    
    return (
        <div>
           {flights && flights}
        </div>
    )
}

export default Flights;