const TOKEN_STORAGE_KEY = '_tt';

export const getToken = () => {
  // localStorage 用于长久保存整个网站的数据,保存的数据没有过期时间,直到手动去删除.
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  return token;
};