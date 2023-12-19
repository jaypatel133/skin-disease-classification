const express = require('express');
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require( "cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require('body-parser');
const reportRouter = require('./routes/report.routes');
const userRouter = require('./routes/user.routes');
const symptomsRouter = require('./routes/symptoms.routes');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}


//connecting to db 
const connect = mongoose.connect('mongodb://127.0.0.1:27017/skido',{
  useNewUrlParser:true,
  useUnifiedTopology: true
})
.then((x)=>{
  console.log(`connected to mongo, database name:"${x.collections[0].name}"`)
})
.catch((err)=>{
  console.error('error:',err.reason)
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//new 
// app.use(cors());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    credentials: true
  }
));

app.use(session({
  secret: 'secretcode',//jhdshhds884hfhhs-ew6dhjd
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser("secretcode"))//jhdshhds884hfhhs-ew6dhjd
//-


app.use(fileUpload());

app.use('/user',userRouter)
app.use('/report',reportRouter)
app.use('/symptom',symptomsRouter)

app.get("/getData", (req, res) => {
  res.send("Connected to Node-js");
  console.log("connected to react");
});


//new
app.post("/login", (req, res) => {
  console.log(req.body);
});

app.post("/register", (req, res) => {
  console.log(req.body);
});

app.post("/user", (req, res) => {
  
});
//-





app.post('/upload',(req,res)=>{
  if(req.files === null)
  {
    return res.status(400).json({msg:'No file uploaded'});
  }


  const file =  req.files.file;

  file.mv(`${__dirname}/frontend/public/uploads/${file.name}`,err=>{
    if(err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({fileName: file.name,filePath: `/upload/${file.name}`});
  })
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

