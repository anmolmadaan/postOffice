var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  sender : {
    name : String,
    phoneno : Number,
    lat : Number,
    lng : Number,
    address : String
  },
  receiver : {
    name : String,
    phoneno : Number,
    lat : Number,
    lng : Number,
    address : String
  },
  weight : Number,
  amount : {
    wAmount : Number,
    dAmount : Number,
    tAmount : Number
  },
  distance : Number,
  payment_status : String
});

var Post = module.exports = mongoose.model('post',postSchema);
