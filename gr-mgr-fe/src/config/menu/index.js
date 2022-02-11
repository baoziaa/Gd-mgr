export default [
  {
    title: '信息管理',
    url: '/records',
    onlyAdmin: false,
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
    onlyAdmin: false,
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
    ],
  },
];