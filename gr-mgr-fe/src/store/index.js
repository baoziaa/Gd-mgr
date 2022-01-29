import { createStore } from 'vuex';
import { character } from '@/service';
import { result } from '@/helpers/utils';

export default createStore({
  state: { //状态 放的一些信息
    characterInfo: [],
  },
  mutations: { //存放函数的集合,修改state 是个函数
    setCharacterInfo(state,characterInfo) { //利用store.commit进行调用
      state.characterInfo = characterInfo;
    },
  },
  actions: { //设置/修改信息之前做的动作
    async getCharacterInfo (store) {
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo',data);
        })
    }
  },
  modules: { //应用体量比较大的时候可能使用的分块
  },
});
