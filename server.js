var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose')
mongoose.connect('mongodb://heroku_4wtxtxxb:6g0suom0q4gftlinrsqlqfl874@ds159651.mlab.com:59651/heroku_4wtxtxxb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://webdev-client-angular.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var userService = require('./services/user.service.server');
var sectionService = require('./services/section.service.server');

userService(app);
sectionService(app);

app.listen(process.env.PORT || 4000);
