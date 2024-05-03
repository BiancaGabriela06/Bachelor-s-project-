import axios from 'axios';

export const attractions = async (req, res) => {

    const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation',
    params: {
        query: req.query.city,
        languagecode: 'en-us'
    },
    headers: {
        'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        const nrDestinations = response.data.data.destinations.length;
        for(let i=0; i < nrDestinations; i++){
           const idDestination = response.data.data.destinations[i].id;
           const optionsDestinations = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions',
            params: {
              id: idDestination,
              languagecode: 'en-us'
            },
            headers: {
              'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
              'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            }
          };
          
          try {
              const responseDestinations = await axios.request(optionsDestinations);
              const nrProducts = responseDestinations.data.data.products.length;
              const attractionsArray = []
              for(let j = 0; j < nrProducts; j++){
                  const Attraction = {}
                  var name = responseDestinations.data.data.products[j].name;
                  var shortDescription = responseDestinations.data.data.products[j].shortDescription;
                  var photo = responseDestinations.data.data.products[j].primaryPhoto.small;
                  var price = responseDestinations.data.data.products[j].representativePrice.chargeAmount 
                  var currency = responseDestinations.data.data.products[j].representativePrice.currency

                  Attraction["Name"] = name;
                  Attraction['Description'] = shortDescription;
                  Attraction["Photo"] = photo;
                  Attraction["Price"] = price + " " + currency;

                  attractionsArray.push(Attraction)
              }
              console.log(attractionsArray);
              return res.json({Status: "Success", Data: attractionsArray})


          } catch (error) {
              console.error(error);
          }

        }
        
    } catch (error) {
        console.error(error);
    }
}