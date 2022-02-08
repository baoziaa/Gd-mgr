import { isAdmin } from '@/helpers/character';


// 注册自定义的指令regDirectives  在main.js里引入注册该自定义指令
export const regDirectives = (app) => {
  app.directive('only-admin', { //第一个参数是自定义制冷的名字,第二个参数是binding一个对象,取到value设置为true
    mounted(el, { value = true }) { //当前元素绑定的父组件挂在的时候去调用
      // 如果是管理员返回true
      const res = isAdmin(); 
      
      // 当我们没有指定值的时候,拥有only-admin这个指令就可以赋值为
      // console.log(binding);

      if (!res && value) {
        // 如果不是管理员隐藏该节点
        el.style.display = 'none';
      }
      
      // console.log(el);
    }
  })
};