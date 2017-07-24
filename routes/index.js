var express = require('express');
var Record = require('../models/record');
var Receipt = require('../models/upiReceipt');
var router = express.Router();
var request=require('request');
var QR = require('qrcode');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 's3post' });
  res.redirect('/first.html');
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
     var body =new Record(req.body);
     body.save(function(err, post){
       if(err){
         res.json(err);
       }
       else{
         QR.toFile('./public/qrcode/'+post._id+'.png',JSON.stringify(post), {
           color: {
             dark: '#000',  // Blue dots
             light: '#FFF' // Transparent background
           }
         }, function (err) {
           if (err) throw err
           console.log('done')
         })
         res.json(post);
       }
     });
});

router.post('/upiCallback/:id',function(req,res){
       var body =new Receipt(req.body);
       body.save(function(err){
         if(err){
           res.send("failure");
         }
         else{
           res.send("success");
         }
       });
});


module.exports = router;
