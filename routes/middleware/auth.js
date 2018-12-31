// 权限中间件
var requiredLogin = (req, res, next) => {
    var _user = res.locals.user
    if (!_user) {
        res.locals.admin = false;
        return res.redirect('/signIn');
    }
    next();
}
var requiredAdmin = (req, res, next) => {
    var _user = res.locals.user
    if (_user.role < 10 || _user.role === 'undefined') {
        console.log("Permission denied");
        res.locals.admin = false;
        return res.redirect("/signIn");
    }
    next();
}


module.exports = {
    requiredLogin,
    requiredAdmin
}