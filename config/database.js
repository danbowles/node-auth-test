var mongoose = require('mongoose');

function Database() {
  this.connectionString  = (process.env.IP || '127.0.0.1') + ':27017/node-auth';
}

Database.prototype.connect = function() {
  mongoose.connect('mongodb://' + this.connectionString);
};

module.exports = new Database();