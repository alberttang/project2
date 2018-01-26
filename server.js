// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
// 
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var db = require("./models");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var crypto = require('crypto')

var salt = 'asdffdsa'


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(passport.initialize());


// Static directory
app.use(express.static("public"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/test-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

require("./routes/test-routes")(app);
require("./routes/model-routes/response-route")(app);
require("./routes/model-routes/poll-route")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, username, password, done) {
    db.User.findOne({
      where: {
        userName: username
      }
    }).then(function (user) {
      if (!user) {
        return done(null, false)
      }
      var saltedPassword = password + salt
      var hashedPassword = crypto.createHash('md5').update(saltedPassword).digest('hex')
      if (hashedPassword === user.password) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }).catch(function (err) {
      return done(err, null)
    })
  }
)) 
