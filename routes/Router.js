var express = require('express');
var router = express.Router();
var User = require('../models/User');

var name = {
    a: "배남석",
    b: "홍길동",
    c: "일지매"
};

router.get('/', function(req, res, next) {
    User.find((err, result) =>{
        if(err) {
            console.log(err)
        }
    // console.log(req)
    // res.send(result);
     res.render('index', {data:result});
    })
});


router.get('/signup', (req, res, next) =>{
    res.render('signup')
})

router.post('/singup', (req, res, next) =>{
    var contact = new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("Success")
})
})

router.get('/login', (req, res, next) =>{
    res.render('login')
})

router.post('/login',async (req, res, next) =>{
    var username = await req.body.username
    var passwordHash = await req.body.passwordHash

    await User.findOne({username:username}, (err, user) => {
        if(err) {
            console.log(err)
        }
        if(!user) {
            res.send(`${username} is not exist`)
        } else {
            if(user.passwordHash ==passwordHash) {
                res.send(`Welcome to myWorld ${username}`)
            } else {
                res.send(`${username}'s password is wrong`)
            }
            //console.log(user)
        }
    })
})

router.get('/main', (req, res ,next) => {
    res.render('main')
})

router.get('/insert', (req, res ,next) => {
    res.render('insert')
})

/*
router.post('/insert', (req, res, next) =>{
    var contact = new User()
    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("Success")
    })
})
*/

module.exports = router;