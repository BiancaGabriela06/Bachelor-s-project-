import axios from 'axios';
import db from "../database.js";

export const getCities = async (req, res) => {
  
    const query = "Select * from countries";
    let countries = [];
    db.query(query, async (err, data) => {
      if(err) console.log(err);
      else 
        { 
          countries = data;
          try {
      
     
            for(let i = 0; i < 50; i++){
              const options = {
                method: 'GET',
                url: 'https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cities',
                params: { country: countries[i].country }, 
                headers: {
                  'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
                  'X-RapidAPI-Host': 'cities-cost-of-living-and-average-prices-api.p.rapidapi.com'
                }
              };
        
              const response = await axios.request(options);
              const query2 = "INSERT into cities (name, country, city) VALUES (?, ?, ?)"
              const citiesLength = response.data.length;
              for(let j=0; j < citiesLength; j++){
                db.query(query2, [response.data[j].name, response.data[j].country, response.data[j].city], (err, result) => {
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log(result);
                  }
      
                })
              }
            }
      
            
          } catch (error) {
            console.error(error);
          }
        }
    });

    
   
};


export const getCountries = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/countries',
        headers: {
          'X-RapidAPI-Key': '94a65e575amshac733d73c3d0dedp1f6454jsn29d3cc8e8715',
          'X-RapidAPI-Host': 'cities-cost-of-living-and-average-prices-api.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          for(let i = 0; i < 197; i++) {
            const country_name = response.data[i].country_name;
            const country = response.data[i].country;
            const query = "INSERT INTO countries (idcountry, country, country_name) VALUES (?, ?, ?)"
            db.query(query, [i, country, country_name], (err, result) => {
              if(err) {
                console.log("eroare insert country");
              }
              else 
                 console.log(result);
            })
          }
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
}

export const listofcities = async (req, res) => {
  const query = "Select name from cities";
  db.query(query, (err, data) => {
    if(err)
       console.log(err);
    else
       {
        return res.json({Status: "Success", Data: data});
       }
  })
}