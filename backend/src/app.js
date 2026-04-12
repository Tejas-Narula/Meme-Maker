const express = require('express');
const cors = require('cors');
const memeSchema = require('./models/meme.schema')

const app = express()
// app.use(cors)
app.use(express.json())


app.post("/memes",(req,res)=>{
  
})

module.exports = app;