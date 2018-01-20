module.exports = function (app) {
    // POST USER CHOSEN ANSWER TO THE DB
    app.post("/api/answer", function (req, res) {
        // 
        db.answer.create(req.body).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });

}; // END FUNCTION EXPORT

// REQUIRE THE MODELS FOLDER
var db = require("../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {
    app.get("/api/authors", function (req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Answer.findAll({
            include: []
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });
    app.get("/api/authors/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Author.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });
    app.post("/api/authors", function (req, res) {
        db.Author.create(req.body).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });
    app.delete("/api/authors/:id", function (req, res) {
        db.Author.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });
};