const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取用户信息'],
  ['/record/detail', '获取详情页信息'],
  ['/user/list', '获取用户列表'],
  ['/record/list', '获取数据列表'],
  ['/invite/list', '获取邀请码列表'],
  ['/auth/login', '登入成功'],
  ['/forget-password/add', '添加忘记密码'],
  ['/forget-password/list', '获取忘记密码列表'],
  ['/destination-classifiy/list', '获取去向分类列表'],
  ['/dashboard/base-info', '获取总览页面信息'],
];

// 获取日志信息路径
export const getLogInfoByPath = (path) => {
  let title = '';
  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      // 如果包含前面的url信息replace(替换)成后面的信息
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
};