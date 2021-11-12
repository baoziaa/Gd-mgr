var jwt = require('jsonwebtoken');  //引入jsonwebtoken
var token = jwt.sign({ 
    account: 'baoziaa',
    _id: '123456' 
}, 'baozi'); //第一个参数是指加密的内容,第二个参数是指加密的密钥
console.log(token);

//解密一个token分为三部分,加密算法、payload和密钥
jwt.verify(token,'baozi',(err,payload) => {    //第一个参数就是生成的token,第二个参数就是payload加密内容部分,第三部分就是一个函数,这个函数有两个参数,第一个参数是err表示解密错误,第二个参数指payload成功返回的内容
    console.log(err,payload);
});


