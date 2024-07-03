import axios from 'axios';
import db from "../database.js";

export const getPossibleItinerary = (req, res) => {
    const idpossible_itinerary = req.query.idPossibleItinerary;

    db.query('Select * from possible_itinerary where id = ?', (idpossible_itinerary), (err, data) => {
        if(err){
            console.log("Error get possible_itinerary");
            console.log(err);
        }
        else{
            return res.json({Status: "Success", Data: data[0]})
        }
    })
}

export const updatePossibleItinerary = (req, res) => {
    const id = req.params.id; 
    const title = req.body.title_trip;
    const notes = req.body.notes;
    const tripDays = req.body.tripDays;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const location = req.body.location
  
    let setClause = '';
    let values = [];
    tripDays.forEach((day, index) => {
      setClause += `day_${index + 1} = ?, `;
      values.push(day.details);
    });
    setClause += `notes = ?, title = ?, start_date = ?, end_date = ?, location = ?`;
  
    const query = `
      UPDATE possible_itinerary
      SET 
        ${setClause}
      WHERE id = ?;
    `;
  
    values.push(notes, title, start_date, end_date, location, id);
  
    db.query(query, values, (err, result) => {
      if(err) {
        console.log(err);
        return res.json({ error: 'Failed to update possible itinerary' });
      } else {
        res.json({ Status: "Success", Message: 'Possible itinerary updated successfully' });
      }
    });
  }
  

export const insertItinerary = (req, res) => {
    const title = req.body.title_trip;
    const notes = req.body.notes;
    const tripDays = req.body.tripDays;
    const start_date = new Date(req.body.start_date).toISOString().slice(0, 19).replace('T', ' '); // Convert to MySQL date format
    const end_date = new Date(req.body.end_date).toISOString().slice(0, 19).replace('T', ' '); // Convert to MySQL date format
    const location = req.body.location;
    const iduser = req.body.iduser;
    
    let columns = 'iduser, notes, title, start_date, end_date, location';
    let placeholders = '?, ?, ?, ?, ?, ?';
    let values = [iduser, notes, title, start_date, end_date, location];
    
    tripDays.forEach((day, index) => {
      columns += `, day_${index + 1}`;
      placeholders += ', ?';
      values.push(day.details);
    });
  
    const query = `
      INSERT INTO itinerary (${columns}) VALUES (${placeholders});
    `;
    
    db.query(query, values, (err, data) => {
      if(err){
        console.log(err);
        res.status(500).json({ error: 'Failed to insert itinerary' });
      }
      else{
        console.log("Success insert in itinerary");
        const status="in-work";
        db.query("Insert into possible_itinerary (iduser, status) VALUES (?, ?)", [iduser, status], (error, result) =>{
          if(error) {
              console.log("Error in inserting in possible_itinerary")
          }
          else{
              console.log("Succes in insert possible_itinerary");
              res.json({ Status: "Success", Message: 'Itinerary inserted successfully', IdPossibleItinerary: result.insertId});
          }})
      }
    });
  }

export const getItineraries = (req, res) => {
    db.query('Select id from users where username = ?', [req.query.username], (error, result) =>{
      if(error) {
        console.log(error)
      }
      else{
        db.query('Select * from itinerary where iduser=?', [result[0].id], (err, data) => {
          if(err){
              console.log("Error get possible_itinerary");
              console.log(err);
          }
          else{
              return res.json({Status: "Success", Data: data})
          }
      })
      }
    })
   
}

export const getItinerary = (req, res) => {
  const itineraryid = req.params.itineraryid;
  db.query('Select * from itinerary where id =?', [itineraryid], (err, data) => {
    if(err){
      console.log(err);
    }
    else{
      return res.json({Status: "Success", Data: data[0]})
    }
  })
}
  
export const deleteItinerary = (req, res) => {
   const itineraryid = req.params.itineraryid;
   db.query('Delete from itinerary where id = ?', [itineraryid], (err, data) => {
    if(err){
      console.log(err);
    }
    else{
      return res.json({Status: "Success"})
    }
   })


}

export const updateItinerary = (req, res) => {
  const id = req.params.id; 
  const title = req.body.title_trip;
  const notes = req.body.notes;
  const tripDays = req.body.tripDays;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  const location = req.body.location
  start_date = new Date(start_date).toISOString().split('T')[0];
  end_date = new Date(end_date).toISOString().split('T')[0];

  let setClause = '';
  let values = [];
  tripDays.forEach((day, index) => {
    setClause += `day_${index + 1} = ?, `;
    values.push(day.details);
  });
  setClause += `notes = ?, title = ?, start_date = ?, end_date = ?, location = ?`;

  const query = `
    UPDATE itinerary
    SET 
      ${setClause}
    WHERE id = ?;
  `;

  values.push(notes, title, start_date, end_date, location, id);

  db.query(query, values, (err, result) => {
    if(err) {
      console.log(err);
      // Handle error
      res.status(500).json({ error: 'Failed to update possible itinerary' });
    } else {
      console.log(result);
      // Handle success
      res.json({ Status: "Success", Message: 'Itinerary updated successfully' });
    }
  });
}

export const soonestTrip = (req, res) => {
  console.log(req.query.username);
  db.query('Select id from users where username = ?', [req.query.username], (error, result) =>{
    if(error) {
      console.log(error)
    }
    else{
      console.log(result[0])
        db.query('SELECT * FROM itinerary WHERE iduser = ? and start_date > NOW() ORDER BY start_date ASC LIMIT 1', [result[0].id], (err, data)=>{
          if(err){
            console.log(err);
          }
          else{
            return res.json({Status: "Success", Data: data[0]})
          }
        })
      }
    });
}