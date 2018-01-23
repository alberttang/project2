var authCont = require("../controllers/auth-controller");
var passport = require('passport')

module.exports = function (app) {
    //login route
    app.post("/api/auth/login",
        passport.authenticate('local', { session: false }),
        authCont.login
    )

    //sign up route
    app.post("/api/auth/signup", authCont.signup)
}
    