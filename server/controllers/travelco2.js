import axios from 'axios'

export const calculate = async (req, res) => {
    console.log(req.body);
    const from = req.body.info.from;
    const to = req.body.info.to;
    const ways = parseInt(req.body.info.ways, 10);
    const people = parseInt(req.body.info.people, 10);
    const transport_type = req.body.info.transport_type;
    
    const options = {
        method: 'POST',
        url: 'https://travel-co2-climate-carbon-emissions.p.rapidapi.com/api/v1/simpletrips',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
          'X-RapidAPI-Host': 'travel-co2-climate-carbon-emissions.p.rapidapi.com'
        },
        data: {
          from: from,
          to: to,
          ways: ways,
          people: people,
          language: 'en',
          title: `Comparing ways of traveling between from ${req.body.info.from} to ${req.body.info.to} `,
          transport_types: [
            req.body.info.transport_type
          ]
        }
      };
      
      try {
          const response = await axios.request(options);
          let found = false;
          console.log(response);
          const title = `Comparing ways of traveling between from ${req.body.info.from} to ${req.body.info.to} `;
          const tripsLength = response.data.trips.length;
          const Trips = [];
          for(let i = 0; i < tripsLength; i++){
              found = true;
              const co2e = response.data.trips[i].co2e;
              const vehicle_title = response.data.trips[i].steps[0].transport.vehicle.title;
              const transportation_title = response.data.trips[i].steps[0].transport.title;

              const Trip = [];
              Trip["Transporation_title"] = transportation_title;
              Trip["Vehicle_title"] = vehicle_title;
              Trip["Co2e"] = co2e;
              Trips.push(Trip);
          }

          console.log(title);
          console.log(Trips[0]);
          if(found == true) {
                return res.json({Status: "Success", Title: title, 
                Transportation_title: Trips[0].Transporation_title,
                Vehicle_title : Trips[0].Transporation_title,
                Co2e: Trips[0].Co2e})
          }
          else{
            return res.json({Status: "No Found", Message: "No way. Try another transporaton method."})
          }
          
      } catch (error) {
          console.error(error);
      }
}