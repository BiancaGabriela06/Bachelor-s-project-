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

export const postGroup = (req, res) => {
    console.log("Add group");
    console.log(req.body);
    db.query('Select id from users where username = ?', [req.body.admin], (err, data) => {
        if(err)
            console.log(err);
        else{
            console.log(data[0])
            const iduser = data[0].id;
            if(iduser != 0){
                const attributesString = JSON.stringify(req.body.attributes.join(','));
                console.log(attributesString);
                db.query('Insert into ecovoyage.groups (title, description, attributes, idadmin) VALUES (?, ?, ?, ?)', [req.body.title, req.body.description, attributesString, iduser], (err2, result) => {
                    if(err)
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

export const getGroups = (req, res) => {
    console.log(req.query.username)
    db.query(`
        SELECT g.idgroup, g.title, g.description, g.attributes, COUNT(gu.userid) AS member_count 
        FROM \`groups\` g 
        LEFT JOIN \`group_user\` gu ON g.idgroup = gu.groupid 
        GROUP BY g.idgroup`, 
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send({ Status: 'Error', Message: 'Failed to fetch groups' });
            } else {
                const groupsWithArrayAttributes = data.map(group => ({
                    ...group,
                    attributes: group.attributes.split(',').map(attribute => attribute.trim())
                }));

                // Check if the user is a member of each group
                db.query(`
                    SELECT gu.groupid 
                    FROM \`users\` u 
                    JOIN \`group_user\` gu ON u.id = gu.userid 
                    WHERE u.username = ?`, 
                    [req.query.username], 
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
                            console.log(groupsWithMembership)
                            return res.send({ Status: 'Success', Data: groupsWithMembership });
                        }
                    }
                );
            }
        }
    );
};


export const joinGroup = (req, res) => {
    console.log(req.body);
    db.query('Select id from users where username = ?', [req.body.username], (err, data) => {
        if(err)
             console.log(err);
        else{
            const userid = data[0].id;
            db.query('Insert into `group_user` (groupid, userid) VALUES (?,?)', [req.body.groupid, userid], (error, result) => {
                if(error) console.log(error);
                else{
                    console.log('Success la insert in group_user');
                    return res.json({Status: "Success", Message: "You joined the goup"})
                }
            })
        }
    })
}

export const getGroupUser = (req, res) => {
    db.query(`
                    SELECT gu.groupid, gu.title 
                    FROM \`users\` u 
                    JOIN \`group_user\` gu ON u.id = gu.userid 
                    WHERE u.username = ?`, 
                    [req.query.username], 
                    (error, result) => {
                        if(error) console.log(error)
                        else{
                           console.log(result)
                           return res.json({Status: "Success", Data: result})
                        }
                    })
}