import db from "../database.js";

export const needgroup = (req, res) => {
    console.log("Need group?")
    db.query("Select id from users where username = ?", [req.query.username], (err, data) => {
        if(err)
           res.json({Status: "Error", Error: err})
        else {
            const id = data[0].id;
            db.query("Select * from group_user where userid = ?", [id], (err, result) => {
                if(err)
                    res.json({Status: "Error", Error: err})
                else{
                    if(result.length == 0){
                        console.log("Yes");
                        res.json({Status: "Yes"});
                    }
                    else{
                        console.log("No");
                        res.json({Status: "No"})
                    }
                       
                }

            })  
        }
    })
}