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
//����û�û��½
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