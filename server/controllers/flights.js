import axios from 'axios';


export const searchAirport = async (req, res) => {
  console.log(req.query.location);
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport',
    params: {query: `${req.query.location}`},
    headers: {
      'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    if(response.data.data.length == 0){
      console.log(`No airport in ${req.query.location}`)
      return res.json({Status: "Success", Message: `No airport` })
    }
         
    else {
       console.log("Codul Aeroportului este: " + response.data.data[0].airportCode);
       return res.json({Status: "Success", Message: 'Airport', Data: response.data.data[0].airportCode})
    }
    
  } catch (error) {
    console.error(error);
    return res.json({Error: error})
  }
}

export const searchFlights = async (req, res) => {
  
    const flightDetailesArray = [];
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
          sourceAirportCode: `${req.query.sourceCode}`,
          destinationAirportCode: `${req.query.destCode}`,
          date: `${req.query.date}`,
          returnDate: `${req.query.returnDate}`,
          itineraryType: 'ROUND_TRIP',
          sortOrder: 'PRICE',
          numAdults: `${req.query.numAdults}`,
          numSeniors: '0',
          classOfService: 'ECONOMY',
          pageNumber: '1',
          currencyCode: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          if(response.data.status == false){
            return res.json({Status: "False", Message: response.data.message})
          }

          const numberOfFlights = response.data.data.flights.length;
          let departureDateTime;
          let arrivalDateTime;
          let classOfService;
          let numStops;
          let originalHours, originalMinutes, offsetMinutes, offsetMilliseconds;
          let timeWithOffset, hoursWithOffset, minutesWithOffset, departureTimeArrival;
          let arrivalTimeArrival, originStationCode, destinationStationCode;
          

          console.log("Number of flights: " + numberOfFlights)
          for(let i = 0; i < numberOfFlights; i++){

            const flightDetails = {};
            const numberofSegments = response.data.data.flights[i].segments.length;
            const numberofPurchaseLinks = response.data.data.flights[i].purchaseLinks.length;
            
            for(let j = 0; j < numberofSegments; j ++){
              const numberofLegs = response.data.data.flights[i].segments[j].legs.length;
              for(let k = 0; k < numberofLegs; k ++) {

                departureDateTime = response.data.data.flights[i].segments[j].legs[k].departureDateTime;
                let dateTime1 = new Date(departureDateTime);
                let dateTime2 = new Date(departureDateTime);
                originalHours = dateTime1.getHours();
                originalMinutes = dateTime1.getMinutes();
                offsetMinutes = dateTime1.getTimezoneOffset();
                offsetMilliseconds = offsetMinutes * 60 * 1000;
                timeWithOffset = new Date(dateTime1.getTime() + offsetMilliseconds);
                hoursWithOffset = timeWithOffset.getHours().toString().padStart(2, '0');
                minutesWithOffset = timeWithOffset.getMinutes().toString().padStart(2, '0'); 
                departureDateTime  = hoursWithOffset + ":" + minutesWithOffset;
                departureTimeArrival = dateTime2.getHours().toString().padStart(2, '0') + ":" + dateTime2.getMinutes().toString().padStart(2, '0');
                
                

                arrivalDateTime = response.data.data.flights[i].segments[j].legs[k].arrivalDateTime;
                dateTime1 = new Date(arrivalDateTime);
                dateTime2 = new Date(arrivalDateTime);
                originalHours = dateTime1.getHours();
                originalMinutes = dateTime1.getMinutes();
                offsetMinutes = dateTime1.getTimezoneOffset();
                offsetMilliseconds = offsetMinutes * 60 * 1000;
                timeWithOffset = new Date(dateTime1.getTime() + offsetMilliseconds);
                hoursWithOffset = timeWithOffset.getHours().toString().padStart(2, '0');
                minutesWithOffset = timeWithOffset.getMinutes().toString().padStart(2, '0'); 
                arrivalTimeArrival = dateTime2.getHours().toString().padStart(2, '0') + ":" + dateTime2.getMinutes().toString().padStart(2, '0');
                 arrivalDateTime  = hoursWithOffset + ":" + minutesWithOffset;


                classOfService = response.data.data.flights[i].segments[j].legs[k].classOfService;
                numStops = response.data.data.flights[i].segments[j].legs[k].numStops;
                originStationCode =  response.data.data.flights[i].segments[j].legs[k].originStationCode;
                destinationStationCode =  response.data.data.flights[i].segments[j].legs[k].destinationStationCode;
              }


            }

            const urlPurchase = response.data.data.flights[i].purchaseLinks[0].url
            const totalPrice =  response.data.data.flights[i].purchaseLinks[0].totalPrice;
            const totalPricePerPassenger = response.data.data.flights[i].purchaseLinks[0].totalPricePerPassenger;

            flightDetails["FlightNumber"] = i;
            flightDetails["DepartureTime"] = departureDateTime;
            flightDetails["DepartureTimeArrival"] = departureTimeArrival;
            flightDetails["ArrivalTime"] = arrivalDateTime;
            flightDetails["ArrivalTimeArrival"] = arrivalTimeArrival;
            flightDetails["ClassOfservice"] = classOfService;
            flightDetails["NumberOfStops"] = numStops;
            flightDetails["TotalPrice"] = totalPrice;
            flightDetails["TotalPricePerPassenger"] = totalPricePerPassenger;
            flightDetails["PurchaseLink"] = urlPurchase;
            flightDetails["originStationCode"] = originStationCode;
            flightDetails["destinationStationCode"] = destinationStationCode;

            flightDetailesArray.push(flightDetails);
          }

          console.log(flightDetailesArray);
          //console.log(response.data.data.flights);
          return res.json({Status: "Success", Data: flightDetailesArray}); 
      } catch (error) {
          console.error(error);
      }
}

