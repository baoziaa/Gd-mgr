import {
  post, get, del
} from '@/helpers/request';

// 在views下面auth下面的index.js去用

// import { getToken } from '@/helpers/token';
// 每次请求都会带上Authorization
// axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

// 添加一条数据
export const add = (form) => post(
  '/record/add', 
  form,
);

// 获取数据列表
export const list = (data) => {
  return get(
    '/record/list',
    data
    );
} 

// 删除
export const remove = (id) => {
  return del(
    `/record/${id}`,
  );
} 

// 数据的编辑
export const update = (data = {}) => {
  return post(
    `/record/update`,
    data,
  );
};

// 详情
export const detail = (id) => {
  return get(
    `/record/detail/${id}`,
  );
};

// 批量添加数据
export const addMany = (key) => {
  return post('/record/addMany',{
    key,
  });
};