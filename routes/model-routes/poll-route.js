var authCont = require('../../controllers/auth-controller.js')
// REQUIRE THE MODELS FOLDER
var db = require("../../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {

    /*
        ================= POST ==================== 
    */

    // POST THE NEW POLL TO THE DB
    app.post("/api/poll", authCont.verifyJwt, function (req, res) {
        console.log("YOOOOOOO")
        // CONSOLE LOG THE REQUEST BODY
        // array of answers
        var answers = req.body.answers;
        // POST THE POLL TO THE DB
        db.Poll.create({
            question: req.body.question,
            category: req.body.category,
            UserId: req.body.UserId
        }).then(function (response) {
            console.log("yo",response)
            answers.forEach(function(answer) {
                answer.PollId = response.id;
            })
            console.log(answers)
           return db.Answer.bulkCreate(answers)
        })
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.log(err);
        });
    }); // END POST

    /*
        ================= GET ==================== 
    */

    // GET SPECIFIC POLL INFO
    app.get("/api/poll/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
        db.Poll.findOne({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            include: [db.Answer, db.User],
            where: {
                id: req.params.id
            }
        }).then(function (dbAuthor) {
            console.log(dbAuthor);            
            // res.json(dbAuthor);
            res.render("newpoll", {
                data: dbAuthor })

        });
    }); // END GET

    // GET SPECIFIC POLL INFO
    app.get("/api/mypoll/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
        db.Poll.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            include: [db.Answer, db.User],
            where: {
                UserId: req.params.id
            }
        }).then(function (dbAuthor) {
                res.render("mypolls", {
                    data: dbAuthor,
                })            
            });
    }); // END GET

    // GET SPECIFIC POLL INFO
    app.get("/api/poll-cat/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
        db.Poll.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            include: [db.Answer],
            where: {
                category: req.params.id
            }
        }).then(function (dbAuthor) {
            // console.log(dbAuthor.data);            
            // res.json(dbAuthor);
            res.render("popular", {
                data: dbAuthor })

        });
    }); // END GET


    app.get("/api/poll-category-search/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
        db.Poll.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            include: [db.Answer],
            where: {
                category: req.params.id
            }
        }).then(function (dbAuthor) {
            // console.log(dbAuthor.data);            
            res.json(dbAuthor);
            // res.render("popular", {
            //     data: dbAuthor })

        });
    }); // END GET

    // GET ALL POLL INFO
    app.get("/api/poll", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET ALL POLLS
        db.Poll.findAll({
            include: [db.Answer, db.User],      
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    }); // END GET

    /*
        ================= DELETE ==================== 
    */

    // DELETE route for deleting polls
    app.delete("/api/poll/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST OBJ
        console.log(req.body);
        // DELETE THE ID IN THE DB
        db.Poll.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    }); // END DELETE

}; // END EXPORT