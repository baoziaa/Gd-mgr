/* 所有的接口都会放在这里 */

// 在views下面auth下面的index.js去用
import axios from 'axios';

// 添加一条数据
export const add = (form) => axios.post(
  'http://localhost:3000/record/add', 
  form,
);

// 获取数据列表
export const list = (data) => {
  return axios.get(
    'http://localhost:3000/record/list',
    {
      params: data,
    }, // axios下面get一个传值方法
  );
} 

// 删除
export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/record/${id}`,
  );
} 

// 数据的编辑
export const update = (data = {}) => {
  return axios.post(
    `http://localhost:3000/record/update`,
    data,
  );
} 