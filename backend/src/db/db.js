const mongoose = require('mongoose')

async function connectDB(){
  await mongoose.connect("mongodb+srv://yt:ufMFfNJeFmSqkbRv@yt-complete-backend.j5g3ngt.mongodb.net/meme-maker");

  console.log("Connect to DB");
}

module.exports = connectDB;