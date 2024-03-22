import axios from 'axios';

export const rentbikes = async (req, res) => {
  console.log("Rent bikes in " + req.query.city)
    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: `Rent Bikes in ${req.query.city}`,
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
        const businessDetailsArray = [];
        for(let i = 0; i < datalength; i++){
          const Business = {};
           name = response.data.data[i].name;
           full_address = response.data.data[i].full_address;
           rating = response.data.data[i].rating;
           timezone = response.data.data[i].timezone;
           website = response.data.data[i].website;
           place_link = response.data.data[i].place_link;
           type = response.data.data[i].type;
           
           
           photo_url = response.data.data[i].photos_sample[0].photo_url;

           Business["Name"] = name;
           Business["Address"] = full_address;
           Business["Rating"] = rating;
           Business["Timezone"] = timezone;
           Business["Website"] = website;
           Business["Link_Map"] = place_link;
           Business["Type"] = type;
           Business["Photo"] = photo_url;

          businessDetailsArray.push(Business);
        }
        console.log(businessDetailsArray);
        return res.json({Status: "Success", Data: businessDetailsArray})
    } catch (error) {
        console.error(error);
    }
}