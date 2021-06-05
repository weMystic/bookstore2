import React, { useState, useEffect } from 'react';
import { Box, ResponsiveGrid, Divider, Card, Avatar, Upload, Button, Form, Input, Message } from '@alifd/next';
import styles from './index.module.scss';
import {useRequest} from 'ice';
import userService from '@/service/user';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

const UserAccountSecurity = () => {

  const {loading: updateUserLoading, request: updateUser } = useRequest(userService.updateUser);

  const handleSubmit = async (value) => {

    // await updateUser({
    //     ...value,
    // });
}

  return (
    <Card free>
      <Card.Content className={styles.SettingPersonBlock}>
        <h1>修改密码</h1>
        <Divider></Divider>
        <Form labelAlign="top" responsive>
          <FormItem label="旧密码" required requiredMessage="必填" colSpan={12}>
            <Input  name="oldPassword" />
          </FormItem>

          <FormItem label="新密码" required requiredMessage="必填" colSpan={12}>
            <Input className={styles.validateCodeInput}  name="newPassword" />
          </FormItem>

          <FormItem label="确认新密码" required requiredMessage="必填" colSpan={12}>
            <Input className={styles.validateCodeInput} name="confirmNewPassword" />
          </FormItem>

          <FormItem colSpan={12}>
            <Box spacing={8} direction="row">
              <Form.Submit type="primary" onClick={(v) => handleSubmit(v)} validate>
                更新密码
              </Form.Submit>
            </Box>
          </FormItem>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default UserAccountSecurity;
