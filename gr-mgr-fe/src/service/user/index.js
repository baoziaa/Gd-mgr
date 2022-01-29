import axios from "axios";

// 获取用户列表
export const list = (page = 1, size = 20, keyword = '') => {
  return axios.get(
    `http://localhost:3000/user/list`,
    {
      params: {
        page,
        size,
        keyword,
      },
    },
  );
};

// 删除用户
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/user/${id}`);
};

// 添加用户
export const add = (account, password, character) => {
  return axios.post('http://localhost:3000/user/add', {
    account,
    password,
    character,
  });
};

// 重置密码
export const resetPassword = (id) => {
  return axios.post('http://localhost:3000/user/reset/password', {
    id,
  });
};

// 修改角色信息
export const editCharacter = (characterId, userId) => {
  return axios.post('http://localhost:3000/user/update/character', {
    character: characterId,
    userId: userId,
  });
};