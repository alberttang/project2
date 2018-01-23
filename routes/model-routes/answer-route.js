// REQUIRE THE MODELS FOLDER
var db = require("../../models");

// EXPORT THESE ROUTES 
module.exports = function (app) {

    /*
        ================= POST ==================== 
    */

    // POST THE NEW POLL TO THE DB
    // app.post("/api/poll", function (req, res) {
    //     // CONSOLE LOG THE REQUEST BODY
    //     console.log(req.body);
    //     // DESTRUCTURING OBJECTS
    //     // OPTION IS NOW A VAR = REQ.BODY.OPTION
    //     // NUM IS NOW A VAR = REQ.BODY.NUM
    //     const {
    //         option,
    //         num
    //     } = req.body;
    //     // GET THE USER IS
    //     db.Answer.create({
    //         // OPTION: OPTION VAR
    //         option,
    //         // NUM: NUM VAR 
    //         num
    //     }).then(function (dbAnswer) {
    //         // PRETTIFY THE THE 
    //         res.json(dbAnswer);
    //     });
    // }); // END POST

}; // END EXPORT