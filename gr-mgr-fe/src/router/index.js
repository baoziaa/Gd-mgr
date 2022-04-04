import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '@/store';
import { message } from 'ant-design-vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
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
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
      {
        path: '/feedback',
        name: 'FeedBack',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/FeedBack/index.vue'),
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
  let res = {};

  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;
  
  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }
    
    message.error('认证失败,请重新登入!');
    next('/auth');

    return;
  }
  
  
  if (!store.state.characterInfo.length) {
    // store.dispatch调用store里面的action
    await store.dispatch('getCharacterInfo'); //拿到用户角色的信息
  }

  const reqArr = [];

  // 没有用户信息的时候去拿用户信息
  if (!store.state.userInfo.account) {
    // store.dispatch调用store里面的action
    // await store.dispatch('getUserInfo');
    reqArr.push(store.dispatch('getUserInfo'));
  }

  if (!store.state.destinationClassifiy.length) {
    // store.dispatch调用store里面的action
    reqArr.push(store.dispatch('getDestinationClassifiy'));
  }

  await Promise.all(reqArr);

  if (to.path === '/auth') {
    next('/dashboard');

    return;
  }
  
  next();
})

export default router;
