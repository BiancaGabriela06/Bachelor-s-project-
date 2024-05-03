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
     const query = "Select c.comment, c.commentid, DATE_FORMAT(c.date, '%Y-%m-%d') AS date, u.profileimage, u.username, u.id from post_comments c, users u  where c.postid = ? and c.userid = u.id "
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
            const query2 = "Insert into post_comments (postid, comment, date, userid) values (?, ?, ?, ? )";
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
    const query = "Delete from post_comments where commentid = ?"
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
                    g.idgroup,
                    u.profileImage
                    FROM  posts p JOIN  \`groups\` g ON p.groupid = g.idgroup
                    JOIN  group_user gu ON gu.groupid = g.idgroup
                    JOIN users u ON u.id = p.userid
                    ORDER by p.date desc; `

    db.query(query1, [], (err, data) => {
        if(err) console.log(err)
        else{
          return res.json({Status: "Success", Data: data})
       
    }
    })
}

export const increaseLikes = (req, res) => {
    console.log("Increase likes : ")
    db.query("Select id from users where username = ?", [req.body.user], (err, result) => {
        if(err) console.log(err)
        else{
          var userId = result[0].id;
          console.log(userId);
          db.query('SELECT * FROM likes WHERE idpost = ? AND iduser = ?', [req.body.postId, userId], (err, data) => {
            if (err) {
              console.error('Error checking like:', err);
              return res.json({ error: 'Internal server error' });
            }
        
            if (data.length > 0) {
              console.log('User has already liked this post')
              return res.json({ Status: "Error", Error: 'User has already liked this post' });
            }
        
            db.query('INSERT INTO likes (idpost, iduser) VALUES (?, ?)', [req.body.postId, userId], (err, results) => {
              if (err) {
                console.error('Error liking post:', err);
                return res.json({ error: 'Internal server error' });
              }
              db.query('UPDATE posts SET likes = likes + 1 where postid = ? ', [req.body.postId], (err, datas) => {
                if(err){
                    console.error("Error update likes in posts")
                }

                db.query('SELECT count(*) as likes FROM likes WHERE idpost = ?', req.body.postId, (err, results) => {
                    if (err) {
                      console.error('Error fetching likes:', err);
                      return res.json({ error: 'Internal server error' });
                    }
                    else{
                        console.log("Number of likes :")
                        console.log(results);
                        res.json({ Status: "Success", Likes: results[0].likes });
                    }
                    
                  });
              })
        
              
            });
          });
    }
    })
    
}

export const userPosts = (req, res) => {
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
                    JOIN users u ON u.id = p.userid
                    where u.username = ?
                    ORDER by p.date desc; `

    db.query(query1, [req.query.username.username], (err, data) => {
        if(err) console.log(err)
        else{
          console.log("Post for user : " + req.query.username.username + " : ")
          console.log(data)
          return res.json({Status: "Success", Data: data})
       
    }
    })
}

export const getImages = (req, res) => {
    db.query(`Select p.image, p.location 
            from posts p join users u on u.id = p.userid
            where u.username = 'BiancaA' AND p.image IS NOT NULL  AND p.image != ''
            order by p.date desc`, [req.query.username], (err, data) => {
                if(err) console.log(err);
                else {
                    console.log("Posts for user: ")
                    console.log(data);
                    return res.json({Status: "Success", Data: data})
                }
            })
    
}

export const deletePost = (req, res) => {
    const postid = req.params.id;
    db.query('Delete from posts where postid = ?', [postid], (err, result) => {
       if(err) {
        console.log(err);
       }
       else{
        db.query('Delete from post_comments where postid = ?', [postid], (error, data) => {
            if(error){
                console.log(error)
            }
            else{
                console.log("Success la delete")
                return res.json({Status: "Success"})
            }
        })
       }
    })
}