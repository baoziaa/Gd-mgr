import {
  post, get
} from '@/helpers/request';

// 获取日志列表
export const list = (page, size) => {
  return get('/log/list', {
    page,
    size
  });
};

// 删除日志
export const remove = (id) => {
  return post('/log/delete', {
    id,
  });
};