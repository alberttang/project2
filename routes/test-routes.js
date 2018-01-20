// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// REQUIRE THE MODELS FOLDER
var db = require("../models");
var User = require('../models/user.js');
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

    app.get("/category*", function (req, res) {
        var hbsObject = {
            name: 1
        };
        res.render("category", hbsObject);
    });


    app.get("/create-poll*", function (req, res) {
        var hbsObject = {
            name: 1
        };
        res.render("poll", hbsObject);
    });

    //login route
    app.post("/login" , function (req, res){
        db.user.findOne({
            where: {
                userName: req.body.userName
            }
        }).then(user => {
            if(user) {
                if(user.password === req.body.password) {
                    res.send({ message: 'success' })
                } else {
                    res.status(400).send({ message: 'username/password is invalid' })
                }
            } else {
                res.status(400).send({ message: 'username/password is invalid' })
            }
        })
    })


    //sign up route
    app.post("/signup", function (req, res) {
        console.log(req.body)
        // TODO: lookup username in DB if there's a username existing, error out and tell the user that username is taken
        //       else send success back
        //find query 

        db.user.findOne({
            where: {
                userName: req.body.userName,
            }
        })
        .then(user => {
            console.log(user);
            if(user) {
                res.status(400).send({ message: 'username is taken, try with different username' })
            } else {
                // TODO: Save this user
                var newUser = db.user.build(req.body)
                newUser.save()
                .then(() => {
                    res.send({ message: 'success' })
                })
                .catch(err => {
                    res.status(400).send({ message: 'could not sign you up, try again later' })
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ message: 'username is invalid'})
        })
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
