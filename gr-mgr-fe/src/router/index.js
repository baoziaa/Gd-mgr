import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: '/records',
        name: 'Records',
        component: () => import(/* webpackChunkName: "Records" */ '../views/Records/index.vue'),
      },
      {
        path: '/records/:id',
        name: 'RecordDetail',
        component: () => import(/* webpackChunkName: "RecordDetail" */ '../views/RecordDetail/index.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: '/log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: '/reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: '/invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: '/destination-classifiy',
        name: 'DestinationClassifiy',
        component: () => import(/* webpackChunkName: "DestinationClassifiy" */ '../views/DestinationClassifiy/index.vue'),
      },
      {
        path: '/data-display',
        name: 'DataDisplay',
        component: () => import(/* webpackChunkName: "DataDisplay" */ '../views/DataDisplay/index.vue'),
      },
      {
        path: '/data-analysis',
        name: 'DataAnalysis',
        component: () => import(/* webpackChunkName: "DataAnalysis" */ '../views/DataAnalysis/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



// beforeEach页面进入之前
router.beforeEach(async (to, from, next) => {
  
  if (!store.state.characterInfo.length) {
    // store.dispatch调用store里面的action
    await store.dispatch('getCharacterInfo'); //拿到用户角色的信息
  }

  // 没有用户信息的时候去拿用户信息
  if (!store.state.userInfo.account) {
    // store.dispatch调用store里面的action
    await store.dispatch('getUserInfo');
  }

  
  next();
})

export default router;
