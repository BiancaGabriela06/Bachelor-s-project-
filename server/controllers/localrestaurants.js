import axios from 'axios';

export const localrestaurants = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: `Restaurants in ${req.query.city}`,
          limit: '20',
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
          'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          const datalength = response.data.data.length;
          let name, full_address, rating, timezone, website, place_link, type, photo_url;
          const restaurantsDetailsArray = [];
          for(let i = 0; i < datalength; i++){
            const Restaurant = {};
             name = response.data.data[i].name;
             full_address = response.data.data[i].full_address;
             rating = response.data.data[i].rating;
             timezone = response.data.data[i].timezone;
             website = response.data.data[i].website;
             place_link = response.data.data[i].place_link;
             type = response.data.data[i].type;
             
             
             photo_url = response.data.data[i].photos_sample[0].photo_url;

             Restaurant["Name"] = name;
             Restaurant["Address"] = full_address;
             Restaurant["Rating"] = rating;
             Restaurant["Timezone"] = timezone;
             Restaurant["Website"] = website;
             Restaurant["Link_Map"] = place_link;
             Restaurant["Type"] = type;
             Restaurant["Photo"] = photo_url;

            restaurantsDetailsArray.push(Restaurant);
          }
          console.log(restaurantsDetailsArray);
          return res.json({Status: "Success", Data: restaurantsDetailsArray})
      } catch (error) {
          console.log("Error local restaurants")
          console.error(error);
      }
}