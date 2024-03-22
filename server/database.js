import mysql from "mysql2"

const db = mysql.createConnection({
    database: "ecovoyage",
    host: "localhost",
    user: "root",
    password: "mysql123"
})

db.connect((err) => {
    if(err){
         console.log('Error in DB connection' + JSON.stringify(err,undefined,2) );
    }
    else{
         console.log('DB Connected successfully' )
    }
})

export default db;