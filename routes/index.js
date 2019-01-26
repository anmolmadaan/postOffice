var express = require('express');
var Record = require('../models/record');
var Receipt = require('../models/upiReceipt');
var router = express.Router();
var request=require('request');
var amount = require('./amount');
var QR = require('qrcode');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 's3post' });
  var x={
    response: "welcome to s3post"
  };
  res.json(x);
});

router.post('/sample', function(req, res, next) {
  //res.render('index', { title: 's3post' });
  var x=res.body;
  x.result = "res";
  res.json(x);
});

router.get('/search',function(req,res){
  var query = req.query.search;
  query.replace(' ','+');
  let results;
  request.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key=API_KEY',function(err,res,body){
if(!err){
    results = res.body.results;

  }
}).pipe(res);
});

router.post('/',function(req,res){
  var distanceLink = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+req.body.sender.lat+','+req.body.sender.lng+'&destinations='+req.body.receiver.lat+','+req.body.receiver.lng+'&key=AIzaSyAvB8e6dplgdhuFg1RfxxEas13xgwhb7cg';
  request.get(distanceLink,function(error, response, data){

  data = JSON.parse(data);
  console.log(data.rows[0]);
  var distance = data.rows[0].elements[0].distance.value;
  distance = distance/1000;
  console.log("distance : " ,distance)
  //var Amount = amount(1700,distance);
 // var xx = "Amount : "+Amount;
 // console.log(Amount);
  //res.send(Amount);

  req.body.amount = amount(req.body.weight,distance);
  req.body.payment_status = 'pending';
  var body =new Record(req.body);
  console.log(body);
  body.save(function(err, post){
    if(err){
      res.json(err);
    }
    else{
      QR.toFile('./public/info/'+post._id+'.png',JSON.stringify(post), {
        color: {
          dark: '#000',
          light: '#FFF'
        }
      }, function (err) {
        if (err)
         throw err;
         let upiString = 'upi://pay?pa=s3post@upi&pn=s3post&tr='+post._id+'&tn=Pay%20to%20s3post&am='+post.amount+'&mam=null&cu=INR&url=https://s3post.herokuapp.com/upiCallback/'+post._id;
         QR.toFile('./public/upi/'+post._id+'.png',upiString, {
           color: {
             dark: '#000',
             light: '#FFF'
           }
         }, function (err) {
           if (err) throw err
           console.log('done')
         });
      });
      res.json(post);
    }
  });


});
});

router.post('/upiCallback/:id',function(req,res){
       var body =new Receipt(req.body);
       var id = req.params.id;
       body.save(function(err,resp){
         if(err){
           res.send("failure");
         }
         else{
           Record.findOneAndUpdate({_id : id},{$set : {payment_status : resp.Status}},function(err){
             res.send("success");
           });
         }
       });
});

router.get('/check/:id',function(req,res){
       let id = req.params.id;
       Record.findById(id,function(err,doc){
         if(err){
           res.json({message : "error"});
         }
         else{
           res.json(doc);
         }
       });
});

router.post('/test',function(req,res){

     var distanceLink = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+req.body.sender.lat+','+req.body.sender.lng+'&destinations='+req.body.receiver.lat+','+req.body.receiver.lng+'&key=AIzaSyAvB8e6dplgdhuFg1RfxxEas13xgwhb7cg';
     request.get(distanceLink,function(error, response, data){

     data = JSON.parse(data);
     console.log(data.rows[0]);
     var distance = data.rows[0].elements[0].distance.value;
     distance = distance/1000;
     console.log("distance : " ,distance)
     //var Amount = amount(1700,distance);
    // var xx = "Amount : "+Amount;
    // console.log(Amount);
     //res.send(Amount);

     req.body.amount = amount(req.body.weight,distance);
     req.body.payment_status = 'pending';
     var body =new Record(req.body);
     console.log(body);
     body.save(function(err, post){
       if(err){
         res.json(err);
       }
       else{
         QR.toFile('./public/info/'+post._id+'.png',JSON.stringify(post), {
           color: {
             dark: '#000',
             light: '#FFF'
           }
         }, function (err) {
           if (err)
            throw err;
            let upiString = 'upi://pay?pa=s3post@upi&pn=s3post&tr='+post._id+'&tn=Pay%20to%20s3post&am='+post.amount+'&mam=null&cu=INR&url=https://s3post.herokuapp.com/upiCallback/'+post._id;
            QR.toFile('./public/upi/'+post._id+'.png',upiString, {
              color: {
                dark: '#000',
                light: '#FFF'
              }
            }, function (err) {
              if (err) throw err
              console.log('done')
            });
         });
         res.json(post);
       }
     });


   });
});
module.exports = router;
