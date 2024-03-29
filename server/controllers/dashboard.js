import axios from 'axios';
import db from "../database.js";

export const postArticle = (req, res) => {
    console.log("Add Article");
    console.log(req.body)

    const date = new Date();
    var iduser = 0;

    db.query('Select id from users where username = ?', [req.body.username], (err, data) => {
        if(err)
            console.log(err);
        else{
            console.log(data[0])
            iduser = data[0].id;
            if(iduser != 0){
                db.query('Insert into articles (idauthor, date, title, text) VALUES (?, ?, ?, ?)', [iduser, date, req.body.title, req.body.text], (err2, result) => {
                    if(err)
                        console.log("Error insert article: " + err2);
                    else {
                        console.log("Articol added sucessfully")
                        console.log(result.insertId);
                        return res.json({Status: "Success", Message: "Article posted successfully", Article: result.insertId})
                    }
                })
            }
        }
           
    })
   
    
}

export const postArticleImages = (req, res) => {
    console.log("post article images : " + req.body);
}