import {
  post, get, del
} from '@/helpers/request';

// 获取用户列表
export const list = (page = 1, size = 20, keyword = '') => {
  return get(
    `/user/list`,
    {
      page,
      size,
      keyword
    },
  );
};

// 删除用户
export const remove = (id) => {
  return del(`/user/${id}`);
};

// 添加用户
export const add = (account, password, character) => {
  return post('/user/add', {
    account,
    password,
    character,
  });
};

// 重置密码
export const resetPassword = (id) => {
  return post('/user/reset/password', {
    id,
  });
};

// 修改角色信息
export const editCharacter = (characterId, userId) => {
  return post('/user/update/character', {
    character: characterId,
    userId: userId,
  });
};

// 拿取用户的数据
export const info = () => {
  return get('/user/info');
};

// 批量添加用户
export const addMany = (key) => {
  return post('/user/addMany',{
    key,
  });
};