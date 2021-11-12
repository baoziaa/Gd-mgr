/* 所有的接口都会放在这里 */

import axios from 'axios';

// 在views下面auth下面的index.js去用
export const register = (account, password) => {
  // 发送一个post请求
  axios.post('http://localhost:3000/auth/register', {
    account,
    password,
  });
};

export const login = (account,password) => {    //这里拿到账户和密码
    axios.post('http://localhost:3000/auth/login', { //post方法,把地址传过去
        account,
        password,
    });
};
