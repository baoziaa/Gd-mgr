import axios from 'axios';

// 获取忘记密码列表
export const list = (page, size) => {
  return axios.get('http://localhost:3000/forget-password/list', {
    params: {
      page,
      size,
    }
  });
};

// 添加忘记密码信息
export const add = (account) => {
  return axios.post('http://localhost:3000/forget-password/add', {
    account,
  });
};

// 更新重置状态
export const updateStatus = (id, status) => {
  return axios.post('http://localhost:3000/forget-password/update/status', {
    id,
    status,
  });
};