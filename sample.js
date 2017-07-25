// var QR = require('qrcode');
// QR.toFile('file.png', 'upi://pay?pa=9649708122@upi&pn=Deepak%20Lahoty&tr=4894398cndcd23&tn=Pay%20to%20s3post&am=1&mam=null&cu=INR&url=https://s3post.herokuapp.com/upiCallback/12345678', {
//   color: {
//     dark: '#000',  // Blue dots
//     light: '#FFF' // Transparent background
//   }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })
var Canvas = require('canvas')
      , Image = Canvas.Image
      , qrcode = require('jsqrcode')(Canvas)

    var filename ='file.png'

    var image = new Image()
    image.onload = function(){
      var result;
      try{
        result = qrcode.decode(image);
        console.log('result of qr code: ' + result);
      }catch(e){
        console.log('unable to read qr code');
      }
    }
    image.src = filename
