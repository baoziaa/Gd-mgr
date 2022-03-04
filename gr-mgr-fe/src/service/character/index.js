import { get } from '@/helpers/request';

// 获取角色列表
export const list = () => {
  return get('/character/list');
};