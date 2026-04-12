const mongoose = require('mongoose')

const textBoxesSchema = new mongoose.Schema({
  id: Number,
  key: Number,
  value: String,
  font: String,

  pos: {
    x: Number,
    y: Number
  },

  posP: {
    x: Number,
    y: Number
  },

  fontSizeP: Number
}, {timestamps: true})


const memeSchema=new mongoose.Schema({
  title:String,
  likes:Number,
  memeTemplate: String,
  textBoxes: [textBoxesSchema],
  ownerId: String

}, {timestamps: true})

const memeModel = mongoose.model("meme", memeModel);

module.exports = memeModel;





/* 

{
    "id": "q4FdcWjDgcpjvGtSphLs",
    "title": "coding",
    "likes": 0,
    "createdAt": {
        "type": "firestore/timestamp/1.0",
        "seconds": 1774783831,
        "nanoseconds": 471000000
    },
    "memeTemplate": "https://i.imgflip.com/2eeunw.jpg",
    "textBoxes": [
        {
            "posP": {
                "x": 0.11219512195121951,
                "y": 0.05106134470851105
            },
            "fontSizeP": 0.041666666666666664,
            "key": 1,
            "value": "react",
            "font": "Impact",
            "id": 1,
            "pos": {
                "x": 46,
                "y": 27.930555555555543
            }
        },
        {
            "id": 2,
            "pos": {
                "y": 420.1111111111111,
                "x": 48
            },
            "font": "Impact",
            "posP": {
                "x": 0.11707317073170732,
                "y": 0.7680276254316474
            },
            "value": "javascript",
            "key": 2,
            "fontSizeP": 0.041666666666666664
        }
    ],
    "ownerId": "0ZboX4NI1bYrwy2SJ6SmX2Q03Pp2"
}


*/