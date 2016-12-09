var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config=require('./dbconfig');
var flash=require('connect-flash');
//加载路由文件  rotates专门存放路由文件
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//设置ejs模板的后缀是html
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//解析session
app.use(cookieParser());
app.use(session({
  //加密cookie
  secret:'zkingblog',
  //每次响应结束以后都更新一下session数据
  resave:true,
  //设置session的有效时间是30分钟
  cookie:{maxAge:1000*60*30},
  //保存新创建但是未初始化的session  也就是session失效了  超过有效时间了30分钟
  saveUninitialized:true,
  //把session的信息保存到数据库中
  store:new MongoStore({
    url:config.dburl
  })

}));

//flash插件模块
app.use(flash());



//由于需要给每个页面在渲染的时候传递session中保存的user对象，所以
//可以条件一个中间件，专门处理session的问题
app.use(function (req,resp,next) {
  resp.locals.user=req.session.user;
  resp.locals.success=req.flash('success');
  resp.locals.error=req.flash('error');
  resp.locals.keyword=req.flash('keyword');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

//设置路由处理模块  所有访问“/”网站根目录的请求都由index路由模块处理

app.use('/', index);
//所有与用户user相关的操作请求都访问“/users”这个路径，并且交给users路由模块处理
app.use('/users', users);
app.use('/article',article);
//app.get()
//app.post()
//app.put()

// catch 404 and forward to error handler
//捕捉错误路由 生成错误对象
app.use(function(req, res, next) {
  res.render("404");
  //next(err);
});
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  //转到下一个中间件 做错误页面的渲染
//  next(err);
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //渲染错误页面
  res.render('error');
});

//把app暴露给外界
module.exports = app;





