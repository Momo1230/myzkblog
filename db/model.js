/**
 * Created by maggie on 16/11/17.
 */
var mongoose = require('mongoose');
var dbconfig = require('../dbconfig.js');

var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect(dbconfig.dburl);
//�������ݿ�ģ��
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {type: String, default: ''},
    avatar: {type: String},//ͷ���ģ��
    createTime:{type:Date,default:new Date().now}
});

var articleSchema = new mongoose.Schema({
    title: String,
    //user������userinfo����û�id,��������Ӧ����ObjectId,Ϊ�˱���֮��Ĺ�����ϵҪʹ��ref����
    user: {type:ObjectId,ref:"userinfo"},
    content: String,
    img:String,
    createTime:{type:Date,default:new Date().now},
    comments:[{user:{type:ObjectId,ref:'userinfo'},content:String,createAt:{type: Date, default: Date.now}}],
    pv:{type:Number,default:0}
});






exports.User = mongoose.model('userinfo', userSchema);
exports.Article = mongoose.model('article', articleSchema);

