var express = require('express');
var router = express.Router();
var User = require('../../models/user');
// signIn
router.post('/user/signIn', (req, res) => {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({
        name: name
    }, (err, user) => {
        if (err) console.log(err);
        if (!user) {
            console.log('User does not exist');
            var msg = "User does not exist,Go to register"
            res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
        } else {
            console.log('Account exists:' + name, password)
                //  res.redirect('/')
            user.comparePassword(password, (err, isMatch) => {
                console.log(password,isMatch)
                if (err) console.log(err);
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/')
                    console.log('Login successful:Password is matched')
                } else {
                    console.log('Login failed:Password is not matched');
                    var msg ="Login failed, password may be wrong, please log in again！"
                    res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
                }
            })
        }
    })
})

// signUp
router.post('/user/signUp', (req, res) => {
    var userObj = req.body.user;
    console.log("userObj",userObj)
    // 如果是已经注册过的，直接重定向到首页
    User.findOne({
        name: userObj.name
    }, (err, user) => {
        if (err) console.log(err);
        if (user) {
            var msg= "Account exists"
            res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
        } else {
            var _user = new User(userObj);
            _user.firstSave = true;
            _user.save((err, user) => {
                if (err) {
                    console.log(err)
                }
                var msg= "Registration is successful"
                res.redirect(`/status?return_url=/signIn&code=1&tips=${msg}`)
            })
        }
    })
})

// loginout
router.get('/loginout', (req, res) => {
    // console.log("1",req.session.user)
    // console.log("2",res.locals.user)
    delete req.session.user;
    delete res.locals.user;
    res.redirect('/');
})
router.get('/signIn', (req, res) => {
    res.render('signIn', {
        title: 'Login'
    })
})
router.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: 'Register'
    })
})

module.exports = router;