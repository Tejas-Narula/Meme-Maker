const express = require("express")
const app = require("./src/app")
const connectDB = require("./src/db/db")

connectDB()


app.listen(3001,()=>{
  console.log("Server Started on port 3001")
})