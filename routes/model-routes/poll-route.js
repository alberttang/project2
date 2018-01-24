// REQUIRE THE MODELS FOLDER
var db = require("../../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {

    /*
        ================= POST ==================== 
    */

    // POST THE NEW POLL TO THE DB
    app.post("/api/poll", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body.question);
        // POST THE POLL TO THE DB
        db.Poll.create({
            question: req.body.question
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        }).catch(function(err) {
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
        db.Poll.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            where: {
                id: req.params.id
            }
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    }); // END GET

    // GET ALL POLL INFO
    app.get("/api/poll", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET ALL POLLS
        db.Poll.findAll({}).then(function (dbAuthor) {
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