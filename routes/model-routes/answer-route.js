module.exports = function (app) {
    // POST USER CHOSEN ANSWER TO THE DB
    app.post("/api/answer", function (req, res) {
        // 
        db.Author.create(req.body).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    });

}; // END FUNCTION EXPORT