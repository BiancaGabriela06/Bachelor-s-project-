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
  const query = "UPDATE users SET profileimage = ? where username = ?";
  db.query(query, [req.body.filename, req.body.user], (err, result) => {
    if(err) return json(err);
    else {
      console.log("User's profile has been updated")
      return res.json({Status: "Success"})
    }
  })
})

app.post("/image/user", (req, res, err) => {
  const query = "Select profileimage from users where username = ?";
  db.query(query, [req.body.username], (err, data) => {
    if(err) {
      console.log(err);
      return res.json(err);
    }
    else {
      
      return res.json({
        Status: "Success",
        profileimage: data[0].profileimage
      });
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