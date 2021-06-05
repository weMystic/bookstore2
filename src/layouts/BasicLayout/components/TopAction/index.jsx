import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Menu, Balloon, Divider, Box, Card } from '@alifd/next';
import { useHistory } from 'ice';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";

function TopAction() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const [username, setUsername] = useState("");

  const signOut = () => {
    if (cookies) {
      Object.keys(cookies).forEach(item => {
          removeCookie(item, { path: "/" });
      });
    }
    history.push('/login');
  };

  useEffect(() => {
    var token = cookies['jwtToken'];
    var payload = jwt_decode(token);
    console.log(`payload`, payload);

    setUsername(payload.userName);
  }, []);

const toPersonalDetails = () => {
  history.push('/userBackstorge/userInfo');
}

const commonProps = {
  subTitle: 'SubTitle',
  extra: <Button text type="primary">Link</Button>
};

const menu = (
  <Menu>
      <Menu.Item>
        <a onClick={() => {toPersonalDetails()}}>个人详情</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => signOut() }>退出</a>
      </Menu.Item>
  </Menu>
);

  return (
    <div>
      <Dropdown trigger={ <Avatar size='small' style={{ backgroundColor: '#87d068' }} icon="account" />} triggerType="click">
        {menu}
      </Dropdown>
      <span style={{ marginLeft: 10 }}>你好, {username}</span>
    </div>
  );
}

export default TopAction;
