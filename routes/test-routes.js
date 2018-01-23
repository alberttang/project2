// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// REQUIRE THE MODELS FOLDER
var db = require("../models");
var User = require('../models/user.js');


var salt = 'asdffdsa'
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

    app.get("/create-poll*", 
        //verifyJwt,
        function (req, res) {
            var hbsObject = {
                name: 1
            };
            res.render("poll", hbsObject);
        });

    

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

    function verifyJwt(req, res, done) {
        jwt.verify(req.headers.Authorization, salt, function(err, decodedUser) {
            if(err) {
                return res.status(401).send({ message: 'user is not authorized' })
            }
            req.user = decodedUser
            done()
        })
    } 
});
}