import db from "../database.js";

export const insertPost = (req, res) => {

    console.log(req.body);
    const query = "Select id from users where username = ?"
    db.query(query, [req.body.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
         
        db.query("Select idgroup from `groups` where title = ?", [req.body.group], (error, data2) =>{
               if(error) console.log(error)
               else{
                console.log(data[0].id);
                const datePost =  new Date();
                const groupid = data2[0].idgroup;
                const query2 = "Insert into posts (userid, image, location, description, date, likes, comments, groupid) values (?, ?, ?, ?, ? , ?, ?, ?)"
                db.query(query2, [data[0].id, req.body.filename, req.body.location, req.body.description, datePost, 0, 0, groupid], (err, data) => {
                    if(err) {
                        console.log(err);
                        return res.json(err);
                    }
                    else{
                        console.log("Post has been created")
                        return res.json({Status: "Success"})
                    }
                })
            }
        } )
        
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
            console.log("Select comment: " + data);
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

export const posts = (req, res) => {
    const query1 = `SELECT 
                    p.postid, 
                    u.username, 
                    p.image, 
                    p.location, 
                    p.description, 
                    p.date, 
                    p.likes, 
                    p.comments, 
                    g.title,
                    u.profileImage
                    FROM  posts p JOIN  \`groups\` g ON p.groupid = g.idgroup
                    JOIN  group_user gu ON gu.groupid = g.idgroup
                    JOIN users u ON u.id = gu.userid
                    ORDER by p.date desc; `

    db.query(query1, [], (err, data) => {
        if(err) console.log(err)
        else{
          return res.json({Status: "Success", Data: data})
       
    }
    })
}

export const increaseLikes = (req, res) => {
    const query = "Update posts SET likes = ? where postid = ?"
    db.query(query, [req.body.likes, req.body.postid], (err, data) => {
        if(err) console.log(err)
        else{
           return res.json({Status: "Success"})
    }
    })
}