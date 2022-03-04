import {
  post, get
} from '@/helpers/request';

// 获取忘记密码列表
export const list = (page, size) => {
  return get('/forget-password/list', {
    page,
    size
  });
};

// 添加忘记密码信息
export const add = (account) => {
  return post('/forget-password/add', {
    account,
  });
};

// 更新重置状态
export const updateStatus = (id, status) => {
  return post('/forget-password/update/status', {
    id,
    status,
  });
};