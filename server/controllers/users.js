import db from "../database.js";
import bycript from "bcrypt";

export const changePassword = (req, res) => {
    if(typeof req.body.currentPassword == 'undefined'){
        return res.json({Status: "Error", Error: "The currentPassowrd field is not completed "});
    }
    else{
        if(typeof req.body.newPassword == 'undefined'){
            return res.json({Status: "Error", Error: "The newPassowrd field is not completed "});

        }

        else
        {
            const query = "UPDATE users SET password = ? where username = ?";
            const salt = bycript.genSaltSync(10);
            const hash = bycript.hashSync(req.body.newPassword, salt);
            db.query(query, [hash, req.body.username], (err, data) => {
                if(err) {
                    console.log(err);
                    return res.json(err);
                }
                else{
                    console.log("Data updated succesfuly");
                    return res.json({Status: "Success",  Event: "Password updated succesfully!"})
                }
            })
        }
    }

}

export const changeUserInfo = (req, res) => {
    const query = "Select id from users where username = ?"
    db.query(query, [req.body.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }

        if(typeof req.body.mobileNumber != undefined)
        {
            const query2 = "Update users_info set phoneNumber = ? where userid = ?"
            db.query(query2, [req.body.mobileNumber, data[0].id], (err, data) =>{
                if(err) {
                    console.log(err);
                    return res.json(err);
                }
                else{
                    console.log("Data updated succesfuly");
                }
            } )
        }
        if(typeof req.body.emailAddress != undefined)
        {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                console.log(pattern.test(req.body.emailAddress))
                if(pattern.test(req.body.emailAddress) == false)
                    return res.json({Status: "Error", Error: "Please insert a valid mail."})
            const query2 = "Update users_info set emailContact = ? where userid = ?"
            db.query(query2, [req.body.emailAddress, data[0].id], (err, data) =>{
                if(err) {
                    console.log(err);
                    return res.json(err);
                }
                else{
                    console.log("Data updated succesfuly");
                }
            } )
        }

        if(typeof req.body.aboutMe != undefined)
        {
            const query2 = "Update users_info set aboutUser = ? where userid = ?"
            db.query(query2, [req.body.aboutMe, data[0].id], (err, data) =>{
                if(err) {
                    console.log(err);
                    return res.json(err);
                }
                else{
                    console.log("Data updated succesfuly");
                }
            } )
        }
        console.log("Data updated succesfully")
        return res.json({Status: "Success",  Event: "Data updated succesfully!"})
    })
}


export const userInfo = (req, res) => {
    const query = "Select id from users where username = ?"
    db.query(query, [req.query.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        
        const query2 = "Select * from users_info where iduser = ?"
        db.query(query2, data[0].id, (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
          
            else if(data.length != 0) {
                return res.json({Status: "Success", data: data[0]});
            }
        })
    })
}

export const isAdmin = (req, res) => {
    db.query("Select admin from users where username=?", [req.query.username], (err, data)=>{
        if(err)
            res.json({Status: "Error", Error: err});
        else{
            if(data[0].admin == 1)
               res.json({Status: "isAdmin"})
            else
               res.json({Status: "noAdmin"})

        }
    })
}

export const editInfo = (req, res) => {
    console.log("Edit profile")
    console.log(req.body);
    var id;
    db.query('Select id from users where username = ?', [req.body.username], (err, data) => {
        if(err){
            console.log("Eroare select id editInfo");
            console.log({Status: "Error"})
        }
        else{
           id = data[0].id;
           if(req.body.aboutUser != ''){
            db.query('Update users_info set aboutUser = ? where iduser = ?', [req.body.aboutUser, id], (err1, result1) =>{
                if(err1) console.log(err1);
            })
           }
           if(req.body.phonenumber != ''){
            db.query('Update users_info set phonenumber = ? where iduser = ?', [req.body.phonenumber, id], (err2, result2) =>{
                if(err2) console.log(err2);
            })
           }
           if(req.body.emailContact != ''){
            const pattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(pattern.test(req.body.emailContact) == false)
                return res.json({Status: "Error", Error: "Please insert a valid mail."})
            db.query('Update users_info set emailContact = ? where iduser = ?', [req.body.emailContact, id], (err3, result3) =>{
                if(err3) console.log(err3);
            })
           }

           db.query('Select * from users_info where iduser = ?', [id], (err4, result4) => {
              if(err4) console.log(err4);
              else
                 return res.json({Status: "Success", Data: result4[0]})
           })
           
        }
    })
}

export const getUsers = (req, res) => {

    const query = `
            SELECT u.username, u.profileImage, DATE_FORMAT(ui.datamembership, '%Y-%m-%d') AS datamembership, ui.aboutUser 
            FROM users u 
            JOIN users_info ui ON u.id = ui.iduser 
            ORDER BY ui.datamembership;`;
    
    db.query(query, [], (err, data) => {
        if(err) console.log(err);
        else {
            return res.json({Status: "Success", Data: data})
        }
    })
}

export const get_userdata = (req, res) => {
    const username = req.query.username;
    const query = `Select u.username, u.profileImage,  DATE_FORMAT(ui.datamembership, '%Y-%m-%d') AS datamembership, ui.phonenumber, 
                    ui.emailContact, ui.aboutUser
                   From users u  JOIN users_info ui ON u.id = ui.iduser
                     Where u.username = ? `
    db.query(query, [username], (err, data) => {
        if(err) console.log(err);
        else {
            return res.json({Status: "Success", Data: data[0]})
        }
    })
}

export const get_usergroup = (req, res) =>{
   const username = req.query.username.username
   const userconnected = req.query.userconnected;
   db.query(`
   SELECT g.idgroup, g.title, g.description, g.attributes
   FROM \`groups\` g 
   LEFT JOIN \`group_user\` gu ON g.idgroup = gu.groupid 
   LEFT join \`users\` u on u.id = gu.userid
   where u.username = ?
   GROUP BY g.idgroup`, [req.query.username.username],
   (err, data) => {
       if (err) {
           console.log(err);
           return res.send({ Status: 'Error', Message: 'Failed to fetch groups' });
       } else {
           const groupsWithArrayAttributes = data.map(group => ({
               ...group,
               attributes: group.attributes.split(',').map(attribute => attribute.trim())
           }));
           
           db.query(`
               SELECT gu.groupid 
               FROM users u JOIN group_user gu ON u.id = gu.userid 
               WHERE u.username = ?`, 
               [req.query.userconnected], 
               (error, result) => {
                   if (error) {
                       console.log(error);
                       return res.status(500).send({ Status: 'Error', Message: 'Failed to check user membership' });
                   } else {
                      
                       const userGroups = result.map(row => row.groupid);
                       const groupsWithMembership = groupsWithArrayAttributes.map(group => ({
                           ...group,
                           isMember: userGroups.includes(group.idgroup)
                       }));
                    
                       return res.send({ Status: 'Success', Data: groupsWithMembership });
                   }
               }
           );
       }
   }
);
}

export const getUserId = (req, res) => {
    const query = "Select id from users where username = ?"
    db.query(query, [req.query.username], (err, data) => {
        if(err) {
            console.log(err);
            return res.json(err);
        }
        else{
            return res.send({ Status: 'Success', Data: data[0].id });
        }
    })
}