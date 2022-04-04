import { get } from '@/helpers/request';

// 获取日志列表
export const list = (page, size) => {
  return get('/map/list');
};
