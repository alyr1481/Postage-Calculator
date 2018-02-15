require('dotenv').config();

var compression = require('compression'),
    express = require("express"),
    app = express(),
    minifyHTML = require('express-minify-html'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSanitizer = require("express-sanitizer"),
    // flash = require("connect-flash"),
    passport = require('passport'),
    LocalStratergy = require('passport-local'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    Push = require('pushover-notifications');


var indexRoutes = require('./routes/index');


// Mongoose Settings
// mongoose.Promise = global.Promise;
// if (process.env.LOCAL_OR_REMOTE==1){
//   mongoose.connect(process.env.MONGO_LOCAL);
// } else{
//   mongoose.connect(process.env.MONGO_REMOTE);
// }

// Express Settings
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
// app.use(flash());
app.use(minifyHTML({
    override:      false,
    exception_url: true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
var cacheTime = 86400000;     // 1 day
app.use(express.static(__dirname + '/public',{ maxAge: cacheTime }));

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  // res.locals.error = req.flash("error");
  // res.locals.success = req.flash("success");
  res.locals.headers = req.headers;
  next();
});

// Initiate Pushover
var p = new Push({
  user: process.env['PUSHOVER_USER'],
  token: process.env['PUSHOVER_TOKEN'],
})

// Server Live Message
var svrLiveMsg = {
  message: 'Server has started on port 3000',
  title: 'PlatinumHPL Postage Calculator Server is Live'
}

// Routes
app.use('/', indexRoutes);

app.get('*', function (req,res){
  res.send("It has Begun!!!");
});

if (process.env.LOCAL_OR_REMOTE==1){
  app.listen(3000,function(){
    console.log("SERVER HAS STARTED!");
    p.send(svrLiveMsg, function (err,result){
      if (err) console.log(err);
    })
  });
} else{
  app.listen(process.env.PORT, process.env.IP,function(){
    console.log("SERVER HAS STARTED!");
  });
}
