import store from '@/store';

// 判断是否为管理员
export const isAdmin = () => {
  const uc = store.state.userCharacter;
  // console.log(uc);
  return uc.name === 'admin';
};

// 判断是否为高级成员_教师
/* export const isTeacher = () => {
  const uc = store.state.userCharacter;
  // console.log(uc);
  return uc.name === '"member2"';
}; */

export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state;
  const one = characterInfo.find((item) => {
    return item._id === id;
  });

    return one || {
      title: '未知角色',
    };

};