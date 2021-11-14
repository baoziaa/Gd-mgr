/* 所有的接口都会放在这里 */

import axios from 'axios';

// 在views下面auth下面的index.js去用
export const register = (account, password, inviteCode) => axios.post('http://localhost:3000/auth/register', { // post方法,把地址传过去
  account,
  password,
  inviteCode,
});

// 这里拿到账户和密码
export const login = (account, password) => axios.post('http://localhost:3000/auth/login', {
  account,
  password,
});
