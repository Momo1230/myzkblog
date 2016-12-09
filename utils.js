/**
 * Created by Administrator on 2016/11/17.
 */
//md5 算法是不可逆加密算法
exports.md5=function(inputStr){
    return require('crypto').createHash('md5').update(inputStr).digest('hex');
}