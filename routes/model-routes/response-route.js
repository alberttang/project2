// REQUIRE THE MODELS FOLDER
var db = require("../../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {

    /*
        ================= POST ==================== 
    */

    // POST THE NEW RESPONSE TO THE DB
    app.post("/api/response", function (req, res) {
        // CONSOLE LOG THE REQUEST BODY
        console.log(req.body);
        // GET THE ANSWER NUMBER
        db.Response.create({
            answerId: req.body.answerId
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
            include: [db.answerId],
            where: {
                id: req.params.id
            }
        }).then(function (dbAuthor) {
            // console.log(dbAuthor.data);            
            // res.json(dbAuthor);
            res.render("mypolls", {
                data: dbAuthor })
        });
    }); // END GET

    /*
        ================= DELETE ==================== 
    */

    // DELETE route for deleting responses
    app.delete("/api/response/:id", function (req, res) {
        // CONSOLE LOG RTHE REQUEST OBJ
        console.log(req.body);
        // DELETE THE ID IN THE DB
        db.Response.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    }); // END DELETE

}; // END EXPORT