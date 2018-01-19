// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
<<<<<<< HEAD
// REQUIRE THE MODELS FOLDER
var db = require("../models");
=======

>>>>>>> ec43bb0d863dfe2e8fb3abab06a2f683011cc9e9
// Routes
// =============================================================
module.exports = function(app) {

<<<<<<< HEAD
    
=======
>>>>>>> ec43bb0d863dfe2e8fb3abab06a2f683011cc9e9
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var hbsObject = {
        name: 1
        };
    res.render("index", hbsObject);
    });

//   // cms route loads cms.html
//   app.get("/cms", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/cms.html"));
//   });

//   // blog route loads blog.html
//   app.get("/blog", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/blog.html"));
//   });

//   // authors route loads author-manager.html
//   app.get("/authors", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//   });
// 
};
