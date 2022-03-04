import {
  post, get, del
} from '@/helpers/request';

// 获取邀请码列表
export const list = (page, size) => {
  return get('/invite/list', {
    page,
    size
  });
};

// 创建邀请码
export const add = (count) => {
  return post('/invite/add', {
    count,
  });
};

// 删除邀请码
export const remove = (id) => {
  return del(`/invite/${id}`);
};