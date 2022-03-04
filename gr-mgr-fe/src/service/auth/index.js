import { post } from '@/helpers/request';

// 在views下面auth下面的index.js去用
export const register = (account, password, inviteCode) => post('/auth/register', { // post方法,把地址传过去
  account,
  password,
  inviteCode,
});

// 这里拿到账户和密码
export const login = (account, password) => post('/auth/login', {
  account,
  password,
});
