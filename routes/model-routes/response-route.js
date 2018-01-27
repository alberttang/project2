// REQUIRE THE MODELS FOLDER
var db = require("../../models");
var authCont = require('../../controllers/auth-controller.js')

// EXPORT THESE ROUTES 
module.exports = function (app) {

    /*
        ================= POST ==================== 
    */

    // POST THE NEW RESPONSE TO THE DB
    app.post("/api/response",  function (req, res) {
        console.log("your route is working!")
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        var Response = req.body.Response;
        // var Poll = req.body.Poll;
        // var User = req.body.user;

        // GET THE ANSWER NUMBER
        db.Response.create({
            answerId: req.body.answerId,
            PollId: req.body.PollId,
            UserId: req.body.UserId
        }).then(function (dbAnswer) {
            // PRETTIFY THE THE JSON
            res.json(dbAnswer);
        });
    }); // END POST

    /*
        ================= GET ==================== 
    */

    // GET SPECIFIC RESPONSE
    app.get("/api/response/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
        db.Response.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            include: [db.Poll],            
            where: {
                PollId: req.params.id
            }
        }).then(function (dbAuthor) {
            // res.json(dbAuthor);
        });
    }); // END GET


    // GET THE POLL INFO
    app.get("/api/response-count/:id", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE USER MODEL 
       
        // db.sequelize.query(“select * from sometable;);
        db.sequelize.query("SELECT Answers.num, COUNT(*) FROM Answers JOIN Responses ON Answers.id = Responses.answerId AND Answers.PollId="+req.params.id+" GROUP BY Answers.num", { type: db.sequelize.QueryTypes.SELECT})
        .then(function (dbAuthor) {
                res.json(dbAuthor);
            });
    }); // END GET 

    /*
        ================= DELETE ==================== 
    */

    // // DELETE route for deleting responses
    // app.delete("/api/response/:id", function (req, res) {
    //     // CONSOLE LOG RTHE REQUEST OBJ
    //     console.log(req.body);
    //     // DELETE THE ID IN THE DB
    //     db.Response.destroy({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         .then(function (dbPost) {
    //             res.json(dbPost);
    //         });
    // }); // END DELETE

}; // END EXPORT