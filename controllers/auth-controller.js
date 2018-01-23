var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var db = require("../models");

exports.login = function (req, res) {
    res.send({ token: jwt.sign(req.user.dataValues, salt) })
}

exports.signup = function (req, res) {
    db.user.findOne({
        where: {
            userName: req.body.userName,
        }
    })
    .then(user => {
        console.log(user);
        if (user) {
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
        res.status(400).send({ message: 'username is invalid' })
    })
}

function verifyJwt(req, res, done) {
    jwt.verify(req.headers.Authorization, salt, function (err, decodedUser) {
        if (err) {
            return res.status(401).send({ message: 'user is not authorized' })
        }
        req.user = decodedUser
        done()
    })
}