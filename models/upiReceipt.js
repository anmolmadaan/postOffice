var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var receiptSchema = new Schema({
  txnId : String,
  responseCode : String,
  ApprovalRefNo : String,
  Status : String,
  txnRef : String
});

var Receipt = module.exports = mongoose.model('receipt',receiptSchema);
