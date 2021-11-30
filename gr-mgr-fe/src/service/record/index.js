/* 所有的接口都会放在这里 */

import axios from 'axios';

// 在views下面auth下面的index.js去用
export const add = (form) => axios.post(
  'http://localhost:3000/record/add', 
  form,
);

export const list = (data) => {
  return axios.get(
    'http://localhost:3000/record/list',
    {
      params: data,
    }, // axios下面get一个传值方法
  );
} 
