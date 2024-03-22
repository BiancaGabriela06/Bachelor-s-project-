import db from "../database.js";

export const insertPost = (req, res) => {

    const query = "Select id from users where username = ?"
    db.query(query, [req.body.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }

        console.log(data[0].id);
        const datePost =  new Date();
        const query2 = "Insert into posts (userid, image, location, description, date, likes, comments) values (?, ?, ?, ?, ? , ?, ?)"
        db.query(query2, [data[0].id, req.body.filename, req.body.location, req.body.description, datePost, 0, 0], (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            else{
                console.log("Post has been created")
               return res.json({Status: "Success"})
            }
        })
    })
}

export const userPosts = (req, res) => {
    const query = "Select id from users where username = ?"
    console.log("User Posts: ")
    console.log(req.query.username);
    db.query(query, [req.query.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        
        console.log(data);
        const query2 = "Select * from posts where userid = ?"
        db.query(query2, data[0].id, (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }

            else if(data.length != 0) {
                console.log(data);
                return res.json({Status: "Success", data: data});
            }
        })
    })

}

export const imagesUser = (req, res) => {
    const query = "Select id from users where username = ?"
    console.log("Gallery");
    console.log(req.query.username);
    db.query(query, [req.query.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }

        console.log(data[0].id);
        const query2 = "Select image from posts where userid = ? and image != ''"
        db.query(query2, data[0].id, (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            else if(data.length != 0) {
                console.log(data);
                return res.json({Status: "Success", data: data});
            }
            else if(data.length == 0) {
                console.log("Nicio imagine")
            }
        })
    })
}

export const showComments = (req, res) => {
     const postid = req.query.postid;
 
     console.log("postid = " + postid);
     const query = "Select c.comment, c.commentid, c.date, u.profileimage, u.username, u.id from comments c, users u  where c.postid = ? and c.userid = u.id "
     db.query(query, [postid], (err, data) =>{
        if(err)
            return res.json({Status: "Error", error: err})
        else if(data.length == 0)
            return res.json({Status: "Success", Message: "No comments"})
        else {
            console.log(data);
            return res.json({Status: "Success", Message: "Post with comments", Comments: data})
        }
           
     })
}

export const addComment = (req, res) => {
    console.log("Add Comment: " + req.body.comment);
    const postid = req.body.comment.postid;
    const comment = req.body.comment.text;
    var userid;
    console.log(postid);
    const dateComment =  new Date();
    db.query("Select id from users where username = ?", [req.body.comment.username], (err, data) =>{
        if(err) {
           console.log(err);
        }
        else{
            userid = data[0].id;
            const query2 = "Insert into comments (postid, comment, date, userid) values (?, ?, ?, ? )";
            db.query(query2, [postid, comment, dateComment, userid], (error, data2) => {
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
    const query = "Delete from comments where commentid = ?"
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