import { createRouter, createWebHashHistory } from 'vue-router';

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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
