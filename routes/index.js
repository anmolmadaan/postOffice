var express = require('express');
var router = express.Router();
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 's3post' });
  res.redirect('/first.html');
});

router.get('/search',function(req,res){
  var query = req.query.search;
  query.replace(' ','+');
  let results;
  request.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key=AIzaSyBwkJa7-4EKLgFg5y645mET2_zy6DHsTvE',function(err,res,body){
if(!err){
    results = res.body.results;
    // console.log(res.body);
    // res.send(results);
  }
}).pipe(res)
//   console.log(results);
// res.json(results);
});



module.exports = router;
