var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');
var serverport      = process.env.PORT || 3000;

var admin = require('./app/routes/admin');
var index = require('./app/routes/index');
var shift = require('./app/routes/shifts');

var app = express();

mongoose.connect('mongodb://localhost/scheduler');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');


app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session handling middleware
app.use(session({
  secret: 'kingtak kittie',
  saveUninitialized: true,
  resave: true
}));

// put & delete middleware
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);
app.use('/shifts', shift);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//only setup livereload in development
if (process.env.NODE_ENV === 'development') {
  var livereload = require('connect-livereload'),
    livereloadport = 35729;

  server.use(livereload({
    port: livereloadport
  }));
}

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var app = app.listen(serverport, function() {
  console.log('Listening on port %d', app.address().port);
});