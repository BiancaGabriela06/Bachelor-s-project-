import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Grid, Button, Autocomplete, TextField, Paper, 
       Card, Typography, CardMedia, CardContent,
       CircularProgress, Box, Alert} from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import restaurant from "../../assets/images/restaurant.jpg";
import bike from "../../assets/images/bike.jpg";

const FlightDetailsComponent = ({ flightDetails }) => {
    console.log(flightDetails)
    return (
    <div style={{ width: "514px", margin: "16px" }}>
         <Paper style={{ height: "100%", width: "95rem", padding: "20px" }}>
            <Grid container spacing={2}>
                 <Grid item style={{ marginLeft: "100px" }} sx={{ paddingRight: '200px' , borderRight: '1px solid #228B22' }}>
                    <Typography variant="h4" fontWeight="bold"><FlightTakeoffIcon/>Departure</Typography>
                    <Typography variant="h4" style={{ marginLeft: "100px" }}>{flightDetails.DepartureTime} <EastIcon/> {flightDetails.DepartureTimeArrival}</Typography>
                    <Typography variant="h4" style={{ marginLeft: "100px" }}>{flightDetails.originStationCode}   {flightDetails.destinationStationCode}</Typography>
                    <Typography variant="h4" fontWeight="bold"><FlightLandIcon/>Return</Typography>
                    <Typography variant="h4" style={{ marginLeft: "100px" }}>{flightDetails.ArrivalTime} <EastIcon/>  {flightDetails.ArrivalTimeArrival}</Typography>
                    <Typography variant="h4" style={{ marginLeft: "100px" }}>{flightDetails.destinationStationCode}   {flightDetails.originStationCode}</Typography>
                 </Grid>
                 <Grid item style={{ marginLeft: "200px" }}>
                    <Button color="success" sx ={{fontSize: "20px"}} href={flightDetails.PurchaseLink} variant="outlined"  >SELECT</Button>
                    <Typography variant="h6">{flightDetails.ClassOfservice}</Typography>
                    <Typography variant="h6">Number of Stops: {flightDetails.NumberOfStops}</Typography>
                    <Typography variant="h5">Total Price: {flightDetails.TotalPrice}</Typography>
                    <Typography variant="h6">Total Price per Passenger: {flightDetails.TotalPricePerPassenger}</Typography>   
                </Grid>
            </Grid> 
        </Paper>
    </div>   
    );
  };

const RentBikesComponent = ({rentBikesDetails}) => {
    return (
        <>
         <div style={{ width: "50rem", margin: "16px" }}>
         <Grid container>
         {rentBikesDetails.Photo !== null ? (
            <Grid item xs={6}>
                <img src={rentBikesDetails.Photo} alt="Rent Bikes" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Grid>
        ) : (
            <Grid item xs={6}>
                <img src={bike} alt="Rent Bikes2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Grid>
        )}

        <Grid item xs={6}>
            <Card style={{ height: "100%", width: "95rem", padding: "20px" }}>
                <CardContent>
                    <Typography variant="h3">{rentBikesDetails.Name}</Typography>
                    <Typography variant="h4">Address: {rentBikesDetails.Address}</Typography>
                    <Typography variant="h4">Review: {rentBikesDetails.Rating}</Typography>
                    <Button color="success" variant="outlined" href={rentBikesDetails.Link_Map}>Use Google Maps</Button>
                    {rentBikesDetails.Website && (
                        <Button href={rentBikesDetails.Website}>Website</Button>
                    )}
                </CardContent>
            </Card>
        </Grid>
    </Grid>
         </div>
        </>
    )
}

const RestaurantComponent = ({localRestaurantDetails}) => {
    return (
        <>
    <div style={{ width: "514px", margin: "16px" }}>
    <Grid container>
       {localRestaurantDetails.Photo !== '' ? (
            <Grid item xs={6}>
                <img src={localRestaurantDetails.Photo} alt="Restaurant" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Grid>
        ) : (
            <Grid item xs={6}>
                <img src={restaurant} alt="Restaurant" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Grid>
        )}
        <Grid item xs={6}>
            <Card style={{ height: "100%", width: "95rem", padding: "20px" }}>
                <CardContent>
                    <Typography variant="h3">{localRestaurantDetails.Name}</Typography>
                    <Typography>Speciality: {localRestaurantDetails.Type}</Typography>
                    <Typography variant="h4">Address: {localRestaurantDetails.Address}</Typography>
                    <Typography variant="h4">Review Tripadvisor: {localRestaurantDetails.Rating}</Typography>
                    <Button color="success" variant="outlined" href={localRestaurantDetails.Link_Map}>Use Google Maps</Button>
                    {localRestaurantDetails.Website && (
                        <Button color="success" variant="outlined" href={localRestaurantDetails.Website}>Website</Button>
                    )}
                </CardContent>
            </Card>
        </Grid>
    </Grid>
</div>
        </>
    )
}
const BarSearchTrip = () => {
    
    const [places, setPlaces] = useState([])
    const [rentBikes, setRentBikes] = useState([]);
    const [localRestaurants, setRestaurants] = useState([]);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");
    const [numPersons, setNumPersons] = useState(1);
    const [flights, setFlights] = useState([]);
    const [codefromAirport, setCodeFromAirport] = useState("");
    const [codetoAirport, setCodeToAirport] = useState("");
    const [loading, setLoading] = useState(false);
    var [errorAiport, setErrorAirport] = useState("");
    const [searched, setSearched] = useState(0);


    const handleWhereTo = (e) => {setToLocation(e.target.value)}
    const handleDateFrom = (e) => {setSelectedDateFrom(e.target.value)}
    const handleDateTo = (e) => {setSelectedDateTo(e.target.value)}
    const handlePersons = (e) => {setNumPersons(e.target.value)}

    useEffect( () => {

        const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/places/listofcities');
                    if (response.data.Status === 'Success') {
                        setPlaces(response.data.Data);
                    } else {
                        console.log(response.data.err);
                    }
                } catch (error) {
                    console.log(error);
                }

     }
    fetchData();
    }, [])

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      setRentBikes([]);
      setRestaurants([]);
      setFlights([]);
      setSearched(1);

      try {
    
        const response1 =  await axios.get('http://localhost:3001/flights/searchAirport', {params: {
          location: fromLocation,
           }
        });
        if (response1.data.Status === 'Success') {
            if(response1.data.Message === 'Airport')
                {
                    setCodeFromAirport(response1.data.Data)
                }
        } else {
            setErrorAirport(response1.data.Error)
            console.log(response1.data.Error);
        }
    

      const response2 =  await axios.get('http://localhost:3001/flights/searchAirport', {params: {
        location: toLocation,
         }
       });
      if (response2.data.Status === 'Success') {
        if(response2.data.Message === 'Airport')
        {
            setCodeToAirport(response2.data.Data)
        }
      } else {
          console.log(response2.data.Error);
      }
      
      if(response1.data.Status === 'Success' && response1.data.Message === 'Airport'
        && response2.data.Status === 'Success' && response2.data.Message === 'Airport')
        {
            console.log("Search flights")
            const response3 =  await axios.get('http://localhost:3001/flights/searchFlights', {params: {
                sourceCode: response1.data.Data,
                destCode: response2.data.Data,
                date: selectedDateFrom,
                returnDate: selectedDateTo,
                numAdults: numPersons
                 }
          });
              if (response3.data.Status === 'Success') {
                  setLoading(false);
                  setFlights(response3.data.Data)
                  
                  console.log("date furnizate: " + response3.data.Data);
                 
              } else {
                  console.log(response3.data.err);
              }
            } 
        }catch (error) {
            console.error(error);
        }
      
       try{
        const response =  await axios.get('http://localhost:3001/restaurants/localrestaurants', {params: {
          city: toLocation,
           }
        });
        if (response.data.Status === 'Success') {
            setLoading(false);
            setRestaurants(response.data.Data);
        } else {
            console.log(response.data.err);
        }
       }catch(error){
        console.error(error);
       }

       try{
        const response =  await axios.get('http://localhost:3001/bikes/rentbikes', {params: {
          city: toLocation,
           }
        });
        if (response.data.Status === 'Success') {
            setLoading(false);
            setRentBikes(response.data.Data);
        } else {
            console.log(response.data.err);
        }
       }catch(error){
        console.error(error);
       }
      
    }
    
    return (
        <>
        <form>
            <Grid container spacing={2} alignItems="center">
                <Grid item >
                <Autocomplete
                        id="standard-search"
                        options={places.map((option) => option.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} 
                            inputProps={params.inputProps ? { ...params.inputProps, style: { fontSize: '1.5rem' } } : { style: { fontSize: '1.5rem' } }}
                             label="Where from" variant="outlined" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required/>
                        )}
                        value={fromLocation}
                        onChange={(event, value) => setFromLocation(value)}
                        />
                </Grid>
                <Grid item >
                <Autocomplete  
                        id="standard-search"  
                        options={places.map((option) => option.name)} 
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Where from" 
                                inputProps={params.inputProps ? { ...params.inputProps, style: { fontSize: '1.5rem' } } : { style: { fontSize: '1.5rem' } }}
                                variant="outlined" 
                                required
                                value={toLocation || ''} // Add a null check here
                                onChange={handleWhereTo}
                                
                            />
                        )}
                        value={toLocation}
                        onChange={(event, value) => setToLocation(value)}
                    />

                </Grid>
                <Grid item >
                     <TextField type="date" value={selectedDateFrom} inputProps={{ style: { fontSize: '1.5rem' } }} variant="outlined" onChange={handleDateFrom} required />
                </Grid>
                <Grid item >
                    <TextField type="date" value={selectedDateTo} inputProps={{ style: { fontSize: '1.5rem' } }} variant="outlined" onChange={handleDateTo} required />
                </Grid>
                <Grid item >
                    <TextField type="text" placeholder="1 traveller" inputProps={{ style: { fontSize: '1.5rem' } }} variant="outlined" value={numPersons} onChange={handlePersons} />
                </Grid>
                <Grid item >
                    <Button variant="contained" color="success" size="large" onClick={handleSubmit}>Plan a trip</Button>
                </Grid>
            </Grid>
        </form>
        {loading === true && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                     <CircularProgress sx={{color: '#228B22'}}/>
               </Box>
        )}
        {flights && searched && flights.length > 0 ? (
            <Typography variant="h3" style={{ marginTop: '30px', marginBottom: '10px' }}>Flights</Typography>
        ) : searched === 1 && flights.length === 0 ? (
            <Alert variant="outlined" severity="warning" sx={{ margin: '4rem', fontSize: '2rem'}}>
                There are no economic flights for this trip.
            </Alert>
        ) : null}
        <div style={{ overflowY: 'scroll', overflowX: 'hidden',  margin: '4rem'}}>
           {flights && flights.map((flight, index) => (
                <div key={index}>
                    <FlightDetailsComponent flightDetails={flight}/>
                </div>
            ))}
        </div>
        {rentBikes && rentBikes.length > 0 ?(
           <Typography variant='h3' style={{ marginTop: '30px', marginBottom: '10px' }}> You can rent a bike in {toLocation}</Typography>
        ): searched === 1 && rentBikes.length === 0 ? (
            <Alert variant="outlined" severity="warning" sx={{ margin: '4rem', fontSize: '2rem'}}>
                There are no possibilities to rent bikes for this trip. 
            </Alert>
         ): null }
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '400px', margin: '20px'}}>
           {rentBikes && rentBikes.map((company, index) => (
                <div key={index}>
                    <RentBikesComponent rentBikesDetails={company}/>
                </div>
            ))}
        </div>
        {localRestaurants && localRestaurants.length > 0 ? (
           <Typography variant='h3' style={{ marginTop: '30px', marginBottom: '10px' }}> Local Restaurants in {toLocation}</Typography>
        ) : searched === 1 && localRestaurants.length === 0 ?(
            <Alert variant="outlined" severity="warning" sx={{ margin: '4rem', fontSize: '2rem'}}>
                There are no local restaurants for this trip. 
            </Alert>
         ): null}
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '400px', margin: '20px'}}>
           {localRestaurants && localRestaurants.map((restaurant, index) => (
                <div key={index}>
                    <RestaurantComponent localRestaurantDetails={restaurant}/>
                </div>
            ))}
        </div>
         </>
        
    );
}

export default BarSearchTrip;