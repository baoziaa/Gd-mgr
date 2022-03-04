export default [
  {
    title: '总览页面',
    url: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '信息管理',
    url: '/records',
    onlyAdmin: false,
  },
  {
    title: '数据展示',
    url: '/data-display',
    onlyAdmin: true,
  },
  {
    title: '数据分析',
    url: '/data-analysis',
    onlyAdmin: true,
  },
  {
    title: '角色管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '日志管理',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '杂项管理',
    onlyAdmin: true,
    children: [
      {
        title: '重置密码管理',
        url: '/reset/password',
        onlyAdmin: true,
      },
      {
        title: '邀请码管理',
        url: '/invite-code',
        onlyAdmin: true,
      },
      {
        title: '去向分类管理',
        url: '/destination-classifiy',
        onlyAdmin: true,
      },
    ],
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
  },
];