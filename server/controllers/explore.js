import axios from 'axios';
import db from "../database.js";

export const getArticles = (req, res) => {
    db.query('Select * from articles', [], (err, data) => {
        if(err) console.log(err);
        else{
            console.log(data);
            return res.json({Status: "Success", Data: data})
        }
    })
}

export const getComments = (req, res) => {
    const articleid = req.query.idarticle;
 
    console.log("article = " + articleid);
    const query = "Select c.comment, c.idcomment, c.date, u.profileimage, u.username, u.id from article_comments c, users u  where c.idarticle = ? and c.iduser = u.id "
    db.query(query, [articleid], (err, data) =>{
       if(err)
           return res.json({Status: "Error", error: err})
       else if(data.length == 0)
           return res.json({Status: "Success", Message: "No comments"})
       else {
           console.log("Select comment: " + data);
           return res.json({Status: "Success", Message: "Article with comments", Comments: data})
       }
          
    })
}

export const addComment = (req, res) => {
    console.log("Add Comment: " + req.body.comment);
    const articleid = req.body.comment.articleid;
    const comment = req.body.comment.text;
    var userid;
    console.log(articleid);
    const dateComment =  new Date();
    db.query("Select id from users where username = ?", [req.body.comment.username], (err, data) =>{
        if(err) {
           console.log(err);
        }
        else{
            userid = data[0].id;
            const query2 = "Insert into article_comments (idarticle, comment, date, iduser) values (?, ?, ?, ? )";
            db.query(query2, [articleid, comment, dateComment, userid], (error, data2) => {
            if(error){
              console.log(error);
              return res.json({Status: "Error", Error: err})
                }
            else {
                 return res.json({Status: "Success", Message: "Comentariu adaugat" })
             }
    })
        }
    })
    
}

export const deleteComment = (req, res) => {
    const commentid = req.params.id;
    console.log("Delete com with " + commentid);
    const query = "Delete from article_comments where idcomment = ?"
    db.query(query, [commentid], (err, data) => {
        if(err)
        {
            console.log(err);
            return res.json({Status: "Error", Error: err})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
}