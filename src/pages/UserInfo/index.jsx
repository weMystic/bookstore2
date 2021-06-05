import React, { useState, useEffect } from 'react';
import { Box, Divider, Card, Button, Form, Input, Message } from '@alifd/next';
import styles from './index.module.scss';
import {useRequest} from 'ice';
import userService from '@/service/user';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";

const FormItem = Form.Item;

const UserInfo = () => {


  const {loading: updateUserLoading, request: updateUser } = useRequest(userService.updateUser);
  const [cookies, setCookie, removeCookie] = useCookies();

  var token = cookies['jwtToken'];
  var payload = jwt_decode(token);
  // const [username, setUsername] = useState(payload.userName);
  // const [userId, setUserId] = useState(payload.userId);
 

  // useEffect(() => {
  //   var token = cookies['jwtToken'];
  //   var payload = jwt_decode(token);
  //   console.log(`payload`, payload);

  //   setUsername(payload.userName);
  //   setUserId(payload.userId);
  // }, []);

  const handleSubmit = async (value) => {

    // await updateUser({
    //     ...value,
    // });
  }

  return (
    <Card free>
      <Card.Content className={styles.SettingPersonBlock}>
        <h1>个人信息</h1>
        <Divider></Divider>
        <Form labelAlign="top" responsive>
          <FormItem label="用户ID" required requiredMessage="必填" colSpan={12}>
            <Input name="userId" defaultValue={payload.userId} disabled={true}/>
          </FormItem>

          <FormItem label="用户名：" required requiredMessage="必填" colSpan={12}>
            <Input className={styles.validateCodeInput} defaultValue={payload.userName} name="userName" />
          </FormItem>

          <FormItem colSpan={12}>
            <Box spacing={8} direction="row">
              <Form.Submit type="primary" onClick={(v) => handleSubmit(v)} validate>
                更新信息
              </Form.Submit>
            </Box>
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default UserInfo;
