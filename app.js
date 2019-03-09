var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require("passport")
var infoAPI = require("./routes/apiInfo.js");
var session = require("express-session");
var multer  = require('multer')
var FacebookStrategy = require('passport-facebook');
var indexRouter = require('./routes/get.index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var dashboardRouter = require('./routes/get.dashboard');
var areaRouter = require('./routes/get.area');
var contactRouter = require('./routes/get.contact');
var videoRouter = require('./routes/get.video');
var emailRouter = require('./routes/get.email');
var destroyAreaRouter = require('./routes/post.destroy');
var newRealEstateRouter = require('./routes/post.newRealeState');
var addLinkVideoRouter = require('./routes/post.addLinkVideo');
var removeLinkVideoRouter = require('./routes/post.removeLinkVideo');
// var findRouter = require('./routes/get.find');
var receiveEmailRouter = require('./routes/post.receive-email');
var produceImage = require('./routes/produce.image.js');
var details = require('./routes/get.details');
var huonggiachu = require('./routes/huonggiachu');
const valid = require("./routes/valid.js");


var mongo = require("mongodb");
const assert = require('assert');
const pathMongodb = require("./routes/mongodb.path.js");

const storage = multer.diskStorage(produceImage)
const upload = multer( { storage: storage } );

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(session(
                { secret: 'coppycat',
                  resave: false,
                  saveUninitialized: false,
                  cookie:{
                    expires: new Date(253402300000000)
                  }
                }
              ));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(infoAPI, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    })|| new LocalStrategy(function(username, password, done) {
   
    })
    )
passport.serializeUser((user, done)=>{
  done(null, user)
})
passport.deserializeUser((id, done)=>{
  done(null, id)
})
app.route("/facebook").get(passport.authenticate("facebook"));
app.use('/signin', signinRouter);
app.use('/users', usersRouter);
app.use('/admin', dashboardRouter);
app.use('/new-area', newRealEstateRouter);
app.use('/admin', areaRouter);
app.use('/view-video-happy-real', videoRouter);
app.use('/lien-he-happy-real', contactRouter);
app.use('/destroy', destroyAreaRouter);
app.use('/linkvideo', addLinkVideoRouter);
app.use('/removevideo', removeLinkVideoRouter);
// app.use('/find', findRouter);
// app.use('/update', updateRouter);
app.use('/huonggiachu', huonggiachu);
app.use('/chi-tiet', details);
app.use('/receive-email', receiveEmailRouter);
app.use('/admin/email-happy-real', emailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;