var QR = require('qrcode');
QR.toFile('/qrcode/file.png', 'upi://pay?pa=anmolmadaan@upi&pn=Anmol%20Madaan&tr=4894398cndhcd23&tn=Pay%20to%20s3post&am=1&mam=0&cu=INR&refUrl=https://s3post.herokuapp.com/upiCallback/12345678', {
  color: {
    dark: '#000',  // Blue dots
    light: '#FFF' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})
