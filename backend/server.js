// const dotenv = require("dotenv")
require("dotenv").config();
const express = require("express");


//express app
const app = express();
// dotenv.config();


// middleware
app.use((req,res,next)=>{
console.log(req.path, req.method);
next();
})

// routes
app.get('/', (req,res)=>{
    res.json({message:"Hello there wassup fam "})
})

//listen for requests
app.listen(process.env.PORT, ()=>{
console.log("hello world!!!");
})