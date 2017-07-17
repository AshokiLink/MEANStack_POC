var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var organizations = require('./routes/organizations');

var app = express();

app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/orgdb', {useMongoClient: true});

app.get('/', function(req, res){
    res.send('API Started...!');
});

var server = app.listen(process.env.PORT || 8085, function(){
    var address = server.address().address;
    var port = server.address().port;

    console.log('Host Address : ' + address);
    console.log('Port Number : ' + port);
});

app.use('/api', organizations);

module.exports = app;