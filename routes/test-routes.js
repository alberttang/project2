// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// REQUIRE THE MODELS FOLDER
var db = require("../models");
var User = require('../models/user.js');
var passport = require('passport')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

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

    app.get("/my-polls",
        //verifyJWT,
        function(req, res) {
            var hbsObject = {
                name: 1
            }
            res.render("mypolls", hbsObject);
        })

    //login route
    app.post("/login" , 
        passport.authenticate('local', { session: false }),   
        function (req, res) {
            res.send({ token: jwt.sign(req.user.dataValues, salt) })
        }
    )

    //sign up route
    app.post("/signup", function (req, res) {
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
                var newUser = db.user.build(req.body)
                var saltedPassword = newUser.password + salt
                var hashedPassword = crypto.createHash('md5').update(saltedPassword).digest('hex')
                // console.log('hashed password', hashedPassword)
                // console.log('raw password', req.body.password)
                // console.log('salt' + salt)
                // console.log('salted password', saltedPassword)

                newUser.password = hashedPassword
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

});
}