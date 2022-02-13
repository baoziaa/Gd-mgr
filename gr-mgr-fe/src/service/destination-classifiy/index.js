import axios from "axios";

// 添加去向分类
export const add = (title) => {
  return axios.post('http://localhost:3000/destination-classifiy/add', {
    title,
  });
};


// 获取去向分类列表
export const list = () => {
  return axios.get('http://localhost:3000/destination-classifiy/list');
};


// 删除分类
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/destination-classifiy/${id}`);
};


// 修改分类
export const updateTitle = (id, title) => {
  return axios.post('http://localhost:3000/destination-classifiy/update/title',{
    id,
    title,
  });
};
