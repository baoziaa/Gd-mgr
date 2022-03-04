import { post } from '@/helpers/request';

// 修改密码
export const resetPassword = (password, oldPassword) => {
  return post('/profile/update/password', {
    password,
    oldPassword,
  });
};