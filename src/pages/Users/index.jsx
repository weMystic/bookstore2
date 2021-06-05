import React, {useEffect, useState} from 'react';
import { ResponsiveGrid, Table, Button, Dialog, Form, Select, Input, Message, Divider, Grid, Search } from '@alifd/next';
import {useRequest} from 'ice';
import userService from '@/service/user';


const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const columns = [
    {
        title: 'Id',
        dataIndex: 'userId'
    },
    {
        title: '用户名',
        dataIndex: 'userName'
    },
]

const filter = [
  {
      label: '全部',
      value: 'all'
  },
	{
		label: '用户ID',
		value: 'userId'
	},
	{
		label: '用户名',
		value: 'userName'
	},
]

const Users = () => {
    const [userList, setUserList] = useState([]);

    const { loading, request: getUserList} = useRequest(userService.getUserList);
    const { loading: getUsersByNameLoading, request: getUsersByName} = useRequest(userService.getUsersByName);
    const {loading: getUsersByIdLoading, request: getUsersById} = useRequest(userService.getUsersById);

    //搜索框的值
    const [value, setValue] = useState('');

    const onSearch = async (value, filterValue) => {
        console.log(value, filterValue);
        switch (filterValue) {
            case 'all':
                const res1 = await getUserList();
                if (res1.success === true) {
                    setUserList(res1.detail);
                }
                break;
            case 'userId':
                const res2 = await getUsersById(value);
                if (res2.success === true) {
                    setUserList(res2.detail);
                }
                break;
            case 'userName':
                const res3 = await getUsersByName(value);
                if (res3.success === true) {
                    setUserList(res3.detail);
                }
                break;
        }

    }

    const onChange = (value) => {
        setValue(value);
    }

    // value is filter value，obj is the search value
    const onFilterChange = (value) => {
        console.log(value);
    }

    useEffect(() => {
        getUserListData();
    }, []);

    const getUserListData = async () => {
        const res = await getUserList();
        console.log(`res`, res);
        if (res.success === true) {
            setUserList(res.detail);
        }
    }


    return (
        <ResponsiveGrid gap={20}>
            <Cell colSpan={20}>
                <div>
                    <div>
                        <Row>
                            <Col></Col>
                            <Col offset="12">
                                <div>
                                    <Search shape="normal" size="large" style={{width: '400px'}} type="primary"
                                        onChange={onChange} onSearch={onSearch}
                                        filterProps={{autoWidth: false}} defaultFilterValue={filter[0].value}
                                        filter={filter} onFilterChange={onFilterChange}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div>
                        <Table dataSource={userList} loading={loading}>
                            {columns.map((item, index)=>(
                                <Table.Column key={item.title} title={item.title} dataIndex={item.dataIndex} />
                            ))}
                        </Table>
                    </div>
                </div>
            </Cell>
        </ResponsiveGrid>
    );
}

export default Users;