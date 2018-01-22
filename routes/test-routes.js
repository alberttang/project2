// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// REQUIRE THE MODELS FOLDER
var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {


    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function (req, res) {
        var hbsObject = {
            name: 1
        };
        res.render("index", hbsObject);
    });


    app.get("/create-poll*", function (req, res) {
        var hbsObject = {
            name: 1
        };
        res.render("poll", hbsObject);
    });

/* Category Pages */

    app.get("/popular", function (req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("popular", hbsObject);
    })

    app.get("/entertainment", function(req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("entertainment", hbsObject);
    })

    app.get("/personal-questions", function(req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("personal-questions", hbsObject);
    })

    app.get("/science", function(req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("science", hbsObject);
    })

    app.get("/philosophy", function(req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("philosophy", hbsObject);
    })

    app.get("/world", function(req, res) {
        var hbsObject = {
            name: 1
        }
        res.render("world", hbsObject);
    })

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
