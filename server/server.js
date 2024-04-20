import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js"
import postsRoutes from "./routes/posts.js"
import db from "./database.js";
import multer from "multer";
import path from "path";
import jwt from 'jsonwebtoken'
import flightRoutes from "./routes/flights.js"
import restarantsRoutes from "./routes/localrestaurants.js"
import bikesRoutes from "./routes/rentbikes.js"
import co2eRoutes from "./routes/travelco2.js"
import placesRoutes from "./routes/places.js"
import groupsRoutes from "./routes/groups.js"
import dashboardRoutes from "./routes/dashboard.js"
import exploreRoutes from "./routes/explore.js"
import { rmdirSync } from 'fs';
import e from 'express';


const app = express()

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use('/flights', flightRoutes);
app.use('/restaurants', restarantsRoutes);
app.use('/bikes', bikesRoutes);
app.use('/co2e', co2eRoutes);
app.use('/places', placesRoutes)
app.use('/groups', groupsRoutes);
app.use('/dashboard', dashboardRoutes)
app.use('/explore', exploreRoutes)



app.get('/api', (req, res) => {
    res.json(
       "from backend-side"
    );
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profileimages');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})


const upload = multer({storage: storage});

app.post("/image/profile", upload.single('file'), (req, res, err) => {

  return res.json({
    Status: "Success",
    filename: req.file.filename
  });
  /// tre sa trimitem inapoi req.file.path si req.file.filename pot
});

app.post("/image/profile/user", (req,res, err) => {
  const query = "UPDATE users SET profileImage = ? where username = ?";
  db.query(query, [req.body.filename, req.body.user], (err, result) => {
    if(err) return json(err);
    else {
      console.log("User's profile has been updated")
      return res.json({Status: "Success"})
    }
  })
})

app.post("/image/user", (req, res, err) => {
  console.log(req.body.username)
  db.query("Select profileImage from users where username = ?;", [req.body.username], (err, data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else {
      console.log("Poza profil pentru " + req.body.username + " este : " + data[0].profileImage)
      return res.json({
        Status: "Success",
        Data: data[0].profileImage
      });
    }
  })
})

app.post("/article/images", (req, res, err) => {
  console.log("Get images articol id: " + req.body.idarticle)
  db.query("Select filename from article_photos where idarticle = ?", [req.body.idarticle], (err, data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else {
      console.log(data);
      return res.json({
        Status: "Success",
        Data: data
      })
    }
  })
})
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/postimages');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload2 = multer({storage: storage2});

app.post("/image/post", upload2.single('file'), (req, res, err) => {

  return res.json({
    Status: "Success",
    filename: req.file.filename
  });
  /// tre sa trimitem inapoi req.file.path si req.file.filename pot
});

const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/articleimages');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload3 = multer({ storage: storage3 });


app.post('/image/article', upload3.array('photos'), function(req, res, next) {
  var files = req.files;
  var articleId = req.body.articleId;
  console.log("Get images for article " + articleId)
  if(articleId != 0){
    if (req.files && req.files.length > 0) {
      files.forEach(file => {
        const filename = file.filename;
        db.query('INSERT INTO article_photos (idarticle, filename) VALUES (?, ?)', [articleId, filename], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error inserting file into database" });
            }
            else{
              console.log(`File ${filename} inserted into database for article with ID ${articleId}`);
              return res.json({ Status: "Success" });
            }      
        });
       });
    }
  }
   else {
    return res.json({ error: "No files uploaded" });
  }
});



const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if(!token){
    return res.json("we need token please provide it for next time")
  }else{
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if(err){
        res.json("Not Authenticated");
      }else{
         req.userId = decoded.id;
         next();
      }
    })
  }
}
app.get('/checkauth', verifyJwt, (req, res) => {
    return res.json("Authenticated");
})



app.listen(3001, () => {
    console.log("Server started on port 3001")
})