exports.checkLogin= function (req, res, next) {
    if(req.session.user)
    {
        next();
    }
    else
    {
        res.redirect('/users/login');
    }

};
//检查用户没登陆
exports.checkNotLogin= function (req, res, next) {
    if(req.session.user)
    {
        res.redirect('/');
    }
    else
    {
        next();
    }

};