require('dotenv').config()

const express= require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true,useUnifiedTopology: true});
const db= mongoose.connection;
db.on("error",(error)=> console.error(error))
db.once('open',()=> console.log("Connected to database"));

app.use(express.json());

const songsRouter = require("./routes/songs");
app.use('/songs',songsRouter)
//Esta sera la ruta predeterminada para poder hacer las peticiones del rest
//localhost:3000/songs

app.listen(3000, () => console.log("Server Started"))