// REQUIRE THE MODELS FOLDER
var db = require("../../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {

    // POST THE NEW USER TO THE DB
    app.post("/api/create/user", function (req, res) {
        // GET THE USER IS
        db.User.create(req.body).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    }); // END POST

    // GET THE USER INFO IN ORDER TO ALLOW FOR LOGIN
    app.get("/api/user/:?", function (req, res) {
        // GET THE USER MODEL 
        db.User.findAll({
            // FIND WHERE THE USERNAME IS THE SAME AS REQ.BODY
            where: {
                userName: req.body
            }
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    }); // END GET

    // DELETE route for deleting posts
    app.delete("/api/delete/user", function (req, res) {
        db.User.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    }); // END DELETE
}; // END EXPORT