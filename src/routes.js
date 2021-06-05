import BasicLayout from '@/layouts/BasicLayout';
import BookStoreLayout from '@/layouts/BookStoreLayout'
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Books from '@/pages/Books'
import Users from './pages/Users';
import UserInfo from './pages/UserInfo';
import UserCart from './pages/UserCart';
import UserAddress from './pages/UserAddress';
import UserOrder from './pages/UserOrder';
import UserAccountSecurity from './pages/UserAccountSecurity';

const routerConfig = [
  { path: '/login', exact: true, component: Login },
  {
    path: '/user',
    component: BookStoreLayout,
  },
  {
    path: '/userBackstorge', //用户后台界面
    component: BasicLayout,
    children: [
      { path: '/userInfo', exact: true, component: UserInfo },
      { path: '/security', exact: true, component: UserAccountSecurity },
      { path: '/orders', exact: true, component: UserOrder },
      { path: '/carts', exact: true, component: UserCart },
      { path: '/address', exact: true, component: UserAddress },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/books', exact: true, component: Books },
      { path: '/users', exact: true, component: Users },
      { path: '/', exact: true, component: Dashboard },
    ],
  },
];

export default routerConfig;
