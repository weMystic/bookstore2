const headerMenuConfig = [];

const asideMenuConfigUser = [
  {
    name: '个人信息',
    path: '/userBackstorge/userInfo',
    icon: 'smile',
  },
  {
    name: '修改密码',
    path: '/userBackstorge/security',
    icon: 'smile',
  },
  {
    name: '订单管理',
    path: '/userBackstorge/orders',
    icon: 'smile',
  },
  {
    name: '购物车管理',
    path: '/userBackstorge/carts',
    icon: 'smile',
  },
  {
    name: '收货地址管理',
    path: '/userBackstorge/address',
    icon: 'smile',
  },
];

const asideMenuConfigAdmin = [
  {
    name: '图书管理',
    path: '/books',
    icon: 'smile',
  },
  {
    name: '用户管理',
    path: '/users',
    icon: 'smile',
  },
];

export { headerMenuConfig, asideMenuConfigAdmin, asideMenuConfigUser };
