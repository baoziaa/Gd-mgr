import { createStore } from 'vuex';
import { character, user, DestinationClassifiy } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character'

export default createStore({
  state: { //状态 放的一些信息
    characterInfo: [], //存储角色信息
    userInfo: [], //存储用户信息
    userCharacter: [], //存储当前登录用户的角色
    destinationClassifiy: [], //存储去向分类信息
  },
  mutations: { //存放函数的集合,修改state 是个函数
    setCharacterInfo(state, characterInfo) { //利用store.commit进行调用
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) { //利用store.commit进行调用
      state.userInfo = userInfo;
    },
    setuserCharacter(state, userCharacter) { //利用store.commit进行调用
      state.userCharacter = userCharacter;
    },
    setDestinationClassifiy(state, destinationClassifiy) { //利用store.commit进行调用
      state.destinationClassifiy = destinationClassifiy;
    },
  },
  actions: { //设置/修改信息之前做的动作
    // 获取去向分类信息
    async getDestinationClassifiy(store) {
      const res = await DestinationClassifiy.list();

      result(res)
        .success(({ data }) => {
          store.commit('setDestinationClassifiy', data);
        });
    },
    // 获取角色信息
    async getCharacterInfo (store) {
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo',data); //利用store.commit进行调用mutations里的函数
        });
    },
    // 获取用户信息
    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({data}) => {
          store.commit('setUserInfo',data); //利用store.commit进行调用mutations里的函数
          // 根据character的ID,查找到该角色并设置该用户的角色
          store.commit('setuserCharacter',getCharacterInfoById(data.character));
          // console.log(store.state);
        });
    }
  },
  modules: { //应用体量比较大的时候可能使用的分块
  },
});
