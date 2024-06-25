import db from "../database.js";

export const needgroup = (req, res) => {
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
                        res.json({Status: "Yes"});
                    }
                    else{
                        res.json({Status: "No"})
                    }
                       
                }

            })  
        }
    })
}

export const getGroups = (req, res) => {
    
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
                
                db.query(`
                    SELECT gu.groupid 
                    FROM users u JOIN group_user gu ON u.id = gu.userid 
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
                    SELECT gu.groupid, g.title 
                    FROM \`users\` u 
                    JOIN \`group_user\` gu ON u.id = gu.userid 
                    JOIN \`groups\` g ON g.idgroup = gu.groupid 
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