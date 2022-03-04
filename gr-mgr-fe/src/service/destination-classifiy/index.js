import {
  post, get, del
} from '@/helpers/request';

// 添加去向分类
export const add = (title) => {
  return post('/destination-classifiy/add', {
    title,
  });
};


// 获取去向分类列表
export const list = () => {
  return get('/destination-classifiy/list');
};


// 删除分类
export const remove = (id) => {
  return del(`/destination-classifiy/${id}`);
};


// 修改分类
export const updateTitle = (id, title) => {
  return post('/destination-classifiy/update/title',{
    id,
    title,
  });
};
