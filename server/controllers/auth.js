import db from "../database.js";
import bycript from "bcrypt";
import { promisify } from "util";
import { validationResult } from "express-validator";
import Randomstring from "randomstring";
import sendMail from '../helpers/sendMail.js'
import jwt from 'jsonwebtoken'
import session from 'express-session'
import express from 'express'
import {generateToken} from '../helpers/jwtHelper.js'

const app = express()

app.use(
    session({
        key:"userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60*60*24,
        },
  }),
)

export const RegisterSendVerification = async (req, res) => {
    try {
      const error = validationResult(req);
  
      console.log(req.body.gmail)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }

      const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
      if(gmailRegex.test(req.body.gmail) == 0){
        console.log("Required Gmail")
        res.json({Status: "Error", Error: "Required Gmail"})
      }
      else {
        const query = promisify(db.query).bind(db);
  
        const result = await query(
          "SELECT * from users where LOWER(mail) = LOWER(?)",
          [req.body.gmail]
        );
    
        if (result && result.length) {
          return res.status(409).send({
            msg: 'This user is already in use!',
          });
        }
    
        const hash = await promisify(bycript.hash)(req.body.password, 10);
        const image = 'icon-user.png';
        const emailverified = 0;
    
        const insertResult = await query(
          "INSERT INTO users (username, mail, password, profileimage, emailVerified) VALUES (?,?,?,?,?)",
          [req.body.username, req.body.gmail, hash, image, emailverified]
        );
    
        const mailSubject = 'Mail Verification';
        const randomToken = Randomstring.generate();
        console.log(randomToken);
        const content = `<p>Hii ${req.body.username}, Please <a href="http://localhost:3000/verify-mail?token=${randomToken}">verify your email</a></p>`;
    
        await sendMail(req.body.gmail, mailSubject, content);
    
        await query(
          'UPDATE users set tokenEmail = ? where mail = ?',
          [randomToken, req.body.gmail]
        );
    
        console.log('User has been created');
        db.query("Select id from users where username = ?", [req.body.username], (err, data) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            else{
                db.query("INSERT INTO users_info (userid) VALUES (?)", data[0].id, (err, data) =>{
                    if(err) {
                        console.log(err);
                        return res.json(err);
                    }
                    else {
                         console.log("Insert in users_info succesful")
                    }
                })
            }
         })
        return res.json({ Status: 'Success', message:'Check you gmail for verification' });
      }
  
      
    } catch (error) {
      console.error('Error in RegisterSendVerification:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
export const login = (req, res) => {
    ///CHECK USER
  
      console.log(req.body.username)
      const query = "SELECT * from users where username = ? or mail = ?"
       db.query(query, [req.body.username, req.body.username], (err, data) => {
          if(err) {
              console.log("Eroare la login");
              return res.json({Status: "Error", Error: "Error in database query"});
          }
          
          if(data.length === 0) {
              console.log("User not found");
              return res.json({Status: "Error",  Error: "Wrong username or password."});
          }
          
     
          /// get crypted password
          const isPasswordCorrect = bycript.compareSync(
              req.body.password, 
              data[0].password
          );
  
          if(!isPasswordCorrect){
            console.log("Parola gresita")
            return res.json({Status: "Error",  Error: "Wrong username or password."});
          } 
          else
              {   
                  db.query("SELECT emailVerified from users where username = ?", [req.body.username], (err, result) => {
                    if(err){
                        console.log(err)
                        return res.json({Status: "Error", Error: "Error in database query"});
                    }
                    else 
                       {
                        if(result.emailVerified == 0)
                            {
                                console.log("Email-ul not verified. Check you mails.");
                                return res.json({Status: "ErrorEmail", Message: "Email-ul not verified. Check you mails."});
                            }
                        else {
                            const id = data[0].id;
                            const mail = data[0].mail;
                            const token = generateToken(id, mail)
                            console.log("Success")
                            console.log(data)
                            return res.json({Status: "Success", Login: true, Token: token, Data: data[0]})
                        }
                       }
                  })
                  
          }
          
       
       });
  }

export const logout = (req, res) => {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out.");
  };


export const verifyMail = (req, res) => {

    const token= req.body.token;
    console.log(token);
    const query = "UPDATE users set emailVerified = 1 where tokenEmail = ?"
    db.query(query, [token], (err, data) => {
        if(err) {
            console.log(err)
        }
        else
        {
            res.json({Status: "Success"})
        }
    })
}

export const forgetpassword = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        const data = await new Promise((resolve, reject) => {
            db.query("SELECT id FROM users WHERE mail = ?", [email], (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (data.length === 0) {
            console.log("User not found");
            return res.json({ Status: "Error", Error: "Wrong username" });
        }

        const mailSubject = 'Change password';
        const randomToken = Randomstring.generate();
        console.log(randomToken);

        const content = `<p> Please, click <a href="http://localhost:3000/changepassword?token=${randomToken}">here</a> to change your password</p>`;

        await sendMail(req.body.email, mailSubject, content);

        return res.json({ Status: "Success" }); // Send the success response here
    } catch (error) {
        console.log("Error sending mail for change password");
        return res.json({ Status: "Error", Error: "Internal server error" }); // Send an error response
    }
};

export const changepassword = (req, res) => {
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;

    if(typeof newpassword == 'undefined')
        return res.json({Status: "Error", Error: "Please enter new password!"});

    if(typeof confirmpassword == 'undefined')
        return res.json({Status: "Error", Error: "Please confirm password!"});

    if(newpassword != confirmpassword)
        return res.json({Status: "Error", Error: "Passwords don't match"});

    if(newpassword < 6)
        return res.json({Status: "Error", Error: "Password must have minimum 6 characters!"});
    
    const salt = bycript.genSaltSync(10);
    const hash = bycript.hashSync(newpassword, salt);

    db.query("UPDATE users set password = ?", [hash], (err, data) => {
        if(err)
           {
            console.log(err);
            return res.json({Status: "Error", Error: "Error database"});
           }
        else 
            return res.json({Status: "Success"});

    })

}