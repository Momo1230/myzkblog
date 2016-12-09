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
//����·���ļ�  rotatesר�Ŵ��·���ļ�
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//����ejsģ��ĺ�׺��html
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//����session
app.use(cookieParser());
app.use(session({
  //����cookie
  secret:'zkingblog',
  //ÿ����Ӧ�����Ժ󶼸���һ��session����
  resave:true,
  //����session����Чʱ����30����
  cookie:{maxAge:1000*60*30},
  //�����´�������δ��ʼ����session  Ҳ����sessionʧЧ��  ������Чʱ����30����
  saveUninitialized:true,
  //��session����Ϣ���浽���ݿ���
  store:new MongoStore({
    url:config.dburl
  })

}));

//flash���ģ��
app.use(flash());



//������Ҫ��ÿ��ҳ������Ⱦ��ʱ�򴫵�session�б����user��������
//��������һ���м����ר�Ŵ���session������
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
//���þ�̬Ŀ¼
app.use(express.static(path.join(__dirname, 'public')));

//����·�ɴ���ģ��  ���з��ʡ�/����վ��Ŀ¼��������index·��ģ�鴦��

app.use('/', index);
//�������û�user��صĲ������󶼷��ʡ�/users�����·�������ҽ���users·��ģ�鴦��
app.use('/users', users);
app.use('/article',article);
//app.get()
//app.post()
//app.put()

// catch 404 and forward to error handler
//��׽����·�� ���ɴ������
app.use(function(req, res, next) {
  res.render("404");
  //next(err);
});
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  //ת����һ���м�� ������ҳ�����Ⱦ
//  next(err);
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //��Ⱦ����ҳ��
  res.render('error');
});

//��app��¶�����
module.exports = app;





