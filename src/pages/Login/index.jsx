import React ,{ useState } from 'react';
import { useRequest, useHistory } from 'ice';
import { useCookies } from 'react-cookie';
import { Form, Input, Grid, Message, Tag } from '@alifd/next';
import userService from '@/service/user';
import styles from './index.module.scss'

const { Item: FormItem } = Form;
const { Row, Col } = Grid;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const Login = () => {
  const { request: login, loading: loginLoading } = useRequest(userService.login);
  const { request: register, loading: registLoading } = useRequest(userService.register);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [pageLogin, setPageLogin] = useState(true)
  const history = useHistory();
  const [userId, setUserId] = useState();

  const loginSubmit = async (v) => {
    console.log(`v`, v);
    const res = await login(v);
    console.log(`res`, res);
    if (res.success) {
        setCookie("jwtToken", res.detail, { path: "/" });
        history.push('/books');
    } else {
        Message.warning(res.msg);
    }
}

const regisSubmit = async (v) => {
    if (v.password !== v.password2) {
        Message.warning("两次密码输入不一致，请重新设置");
        return;
    }
    const data = {
      userId: 0,
      userName: v.username,
      userPassword: v.password,
      isDeleted: 0
    }

    const res = await register(data);
    if (res.success) {
      Message.notice("注册成功");
      console.log(`res.detail`, res.detail);
      setUserId(res.detail.userId);
      setPageLogin(true);
    } else {
      Message.warning(res.msg);
    }
}


  const LoginForm = <div>
      <FormItem label="用户ID:">
          <Input name="userId" defaultValue={userId}/>
      </FormItem>
      <FormItem label="密码:">
          <Input.Password name="password" />
      </FormItem>
      <Form.Submit loading={loginLoading} validate type="secondary" style={{ marginRight: 10 }} onClick={(v) => loginSubmit(v)}>立即登录</Form.Submit>
      <Form.Submit text onClick={() => setPageLogin(false)}>注册</Form.Submit>
    </div>;

  const RegisterForm = <div>
    <FormItem label="用户名:">
        <Input name="username" required />
    </FormItem>
    <FormItem label="密码:">
        <Input.Password name="password" required />
    </FormItem>
    <FormItem label="再次输入密码:">
        <Input.Password name="password2" required />
    </FormItem>
    <Form.Submit loading={registLoading} validate type="secondary" style={{ marginRight: 10 }} onClick={(v) => regisSubmit(v)}>立即注册</Form.Submit>
    <Form.Submit text onClick={() => setPageLogin(true)}>登录</Form.Submit>
  </div>;

  return <div className={styles.bg}>
    <Row justify='end' align='center' style={{ height: '100vh' }}>
        <Col span='8'>
            <div className={styles.login}>
                <h1>网上书城系统 <Tag size='small' type='primary' color={pageLogin ? '#2db7f5' : '#87d068'}>{pageLogin ? '登录' : '注册'}</Tag></h1>
                <Form {...formItemLayout} size='medium' style={{ maxWidth: '500px' }}>
                    {pageLogin ? LoginForm : RegisterForm}
                </Form>
            </div>
        </Col>
    </Row>
    </div>
}

export default Login;
