import axios from 'axios';
import db from "../database.js";

export const postArticle = (req, res) => {
    const date = new Date();
    var iduser = 0;

    db.query('Select id from users where username = ?', [req.body.username], (err, data) => {
        if(err)
            console.log(err);
        else{
            iduser = data[0].id;
            const categoriesString = JSON.stringify(req.body.categories.join(','));
            if(iduser != 0){
                db.query('Insert into articles (idauthor, date, title, text, categories) VALUES (?, ?, ?, ?, ?)', [iduser, date, req.body.title, req.body.text, categoriesString], (err2, result) => {
                    if(err2)
                        console.log("Error insert article: " + err2);
                    else {
                        console.log("Articol added sucessfully " + result.insertId)
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

export const postGroup = (req, res) => {
    db.query('Select id from users where username = ?', [req.body.admin], (err, data) => {
        if(err)
            console.log(err);
        else{
            const iduser = data[0].id;
            if(iduser != 0){
                const attributesString = JSON.stringify(req.body.attributes.join(','));
                db.query('Insert into ecovoyage.groups (title, description, attributes, idadmin) VALUES (?, ?, ?, ?)', 
                    [req.body.title, req.body.description, attributesString, iduser], (err2, result) => {
                    if(err2)
                        console.log("Error insert group: " + err2);
                    else {
                        db.query('Insert into group_user (groupid, userid) VALUES (?,?)', [result.insertId, iduser], (err3, data)=>{
                            if(err3) console.log(err3);
                        })
                        console.log("Group added sucessfully")
                        return res.json({Status: "Success", Message: "Group posted successfully"})
                    }
                })
            }
        }
           
    })
}

