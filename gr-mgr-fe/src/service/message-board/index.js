import {
  post, get, del
} from '@/helpers/request';

// 添加去向分类
export const add = (substance) => {
  return post('/message-board/add', {
    substance,
  });
};


// 获取去向分类列表
export const list = (page = 1, size = 10) => {
  return get(
    '/message-board/list',
    {
      page,
      size
    },
  );
};


// 删除分类
export const remove = (id) => {
  return del(`/message-board/${id}`);
};


// 修改分类
export const updateSubstance = (id, substance) => {
  return post('/message-board/update/substance',{
    id,
    substance,
  });
};
