import React, {useEffect, useState} from 'react';
import { ResponsiveGrid, Table, Button, Dialog, Form, Select, Input, Message, Divider, Grid, Search } from '@alifd/next';
import {useRequest} from 'ice';
import bookService from '@/service/book';


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
        dataIndex: 'bookId'
    },
    {
        title: 'ISBN',
        dataIndex: 'isbn'
    },
    {
        title: '名称',
        dataIndex: 'bookName'
    },
    {
        title: '作者',
        dataIndex: 'bookAuthor'
    },
    {
        title: '库存',
        dataIndex: 'bookAmount'
    },
    {
        title: '价格',
        dataIndex: 'bookPrice'
    },
    {
        title: '类型',
        dataIndex: 'bookType',
    },
]

const formItemList = [
    {
        label: "Id:",
        name: "id",
        dataIndex: "bookId",
        required: true,
        requiredMessage: "必填",
        placeholder: "Please enter the book id",
    },
    {
        label: "ISBN:",
        name: "ISBN",
        dataIndex: "isbn",
        required: true,
        requiredMessage: "必填",
        placeholder: "Please enter the book ISBN",
    },
    {
        label: "名称:",
        name: "name",
        dataIndex: "bookName",
        required: true,
        requiredMessage: "必填",
        placeholder: "Please enter the book name",
    },
    {
        label: "作者:",
        name: "author",
        dataIndex: "bookAuthor",
        required: true,
        requiredMessage: "必填",
        placeholder: "Please enter the book author",
    },
    {
        label: "库存:",
        name: "amount",
        dataIndex: 'bookAmount',
        required: true,
        requiredMessage: "必填",
        placeholder: "Please enter the book amount",
    },
    {
        label: "价格:",
        dataIndex: "bookPrice",
        required: true,
        name: "price",
        requiredMessage: "必填",
        placeholder: "Please enter the book price",
    },
]

const filter = [
    {
        label: '全部',
        value: 'all'
    },
	{
		label: '类型',
		value: 'bookType'
	},
	{
		label: '作者',
		value: 'bookAuthor'
	},
	{
		label: 'ISBN',
		value: 'ISBN'
	},
    {
        label: 'ID',
        value: 'bookId'
    },
	{
		label: '名称',
		value: 'bookName'
	},
]

const Books = () => {
    const [bookList, setBookList] = useState([]);
    const [bookTypeList, setBookTypeList] = useState([]);
    const [bookInfo, setBookInfo] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");

    const { loading, request: getBookList} = useRequest(bookService.getBookList);
    const { loading: getBookByNameLoading, request: getBooksByName} = useRequest(bookService.getBooksByName);
    const { loading: getBooksByAuthorLoading, request: getBooksByAuthor} = useRequest(bookService.getBooksByAuthor);
    const { loading: getBooksByTypeLoading, request: getBooksByType} = useRequest(bookService.getBooksByType);
    const {loading: getBookByIdLoading, request: getBookById} = useRequest(bookService.getBookById);
    const {loading: getBookByISBNLoading, request: getBookByISBN} = useRequest(bookService.getBookByISBN);

    const { request: getBookTypeList } = useRequest(bookService.getBookTypeList);
    const { loading: deleteLoading, request: deleteBook } = useRequest(bookService.deleteBook);
    const { loading: updateLoading, request: updateBook } = useRequest(bookService.updateBook);
    const { loading: addLoading, request: addBook } = useRequest(bookService.addBook);

    //搜索框的值
    const [value, setValue] = useState('');

    const onSearch = async (value, filterValue) => {
        console.log(value, filterValue);
        switch (filterValue) {
            case 'all':
                const res1 = await getBookList();
                if (res1.success === true) {
                    setBookList(res1.detail);
                }
                break;
            case 'bookType':
                const res2 = await getBooksByType(value);
                if (res2.success === true) {
                    setBookList(res2.detail);
                }
                break;
            case 'bookName':
                const res3 = await getBooksByName(value);
                if (res3.success === true) {
                    setBookList(res3.detail);
                }
                break;
            case 'bookId':
                const res4 = await getBookById(value);
                if (res4.success === true) {
                    setBookList(res4.detail);
                }
                break;
            case 'bookAuthor':
                const res5 = await getBooksByAuthor(value);
                if (res5.success === true) {
                    setBookList(res5.detail);
                }
                break;
            case 'ISBN':
                const res6 = await getBookByISBN(value);
                if (res6.success === true) {
                    setBookList(res6.detail);
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
        getBookListData();
        getBookTypeListData();
    }, []);

    const getBookListData = async () => {
        const res = await getBookList();
        console.log(`res`, res);
        if (res.success === true) {
            setBookList(res.detail);
        }
    }

    const getBookTypeListData = async () => {
        const res = await getBookTypeList();
        if (res.success === true) {
            setBookTypeList(res.detail);
        }
    }

    const handleOpenDialog = (type) => {
        setDialogTitle(type);
        setVisible(true);
    };

    const handleCloseDialog = reason => {
        console.log(reason);
        setVisible(false);
        setIsEdit(false);
    };

    const refreshList = (type) => {
        const books = getBookListData();
        setBookList(books.details);
        setVisible(false);
        Message.success(type+'成功');
    }

    const handleSubmit = async (value) => {
        if (dialogTitle === '新增图书') {
            await addBook({
                ...value,
                bookState: 0,
                bookId: -1
            });
             refreshList("新增图书");
            return;
        }

        await updateBook({
            ...value,
            bookState: 0,
        });
        await refreshList("编辑图书");
        setIsEdit(false);
    }

    const handleEditData = (value, index,record)=>{
        setBookInfo(record);
        setIsEdit(true);
        handleOpenDialog("编辑图书", record);
    }

    const handleDeleteData = async (record) => {
        console.log(record);
        await deleteBook(record.bookId);
        await refreshList("删除");
    }


    const renderHandleOperation = (value, index, record)=>{
        return (
            <div>
                <Button type="primary" text onClick={()=>handleEditData(value, index, record)}> 编辑</Button>
                <Divider direction='ver'></Divider>
                <Button type="primary" loading={deleteLoading} text onClick={()=>handleDeleteData(record)}> 删除</Button>
            </div>
        )
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
                        <Table dataSource={bookList} loading={loading}>
                            {columns.map((item, index)=>(
                                <Table.Column key={item.title} title={item.title} dataIndex={item.dataIndex} />
                            ))}
                            <Table.Column key="操作" title="操作" dataIndex="operation" cell={(v, i, r)=>renderHandleOperation(v, i, r)} />
                        </Table>
                    </div>
                    <Dialog
                        isFullScreen
                        footerAlign="center"
                        shouldUpdatePosition
                        footer={false}
                        style={{ width: 600 }}
                        title={dialogTitle}
                        visible={visible}
                        onClose={handleCloseDialog}>
                            <Form
                                labelAlign="top"
                                fullWidth
                                {...formItemLayout}
                            >
                                {formItemList.map(item => (
                                    <FormItem label={item.label} required={item.required} requiredMessage={item.requiredMessage} key={item.label} 
                                                style={{display: item.dataIndex === 'bookId' ? 'none' : 'block'}}
                                    >
                                        <Input
                                            defaultValue={isEdit ? bookInfo[item.dataIndex] : ''}
                                            id={item.dataIndex} 
                                            name={item.dataIndex}
                                            placeholder={item.placeholder}
                                            width={100}
                                            // disabled={item.dataIndex === 'ISBN' && isEdit ? true : false}
                                            // style={{display: item.dataIndex === 'bookId' ? 'none' : 'block'}} 可以控制不显示
                                        />
                                    </FormItem>
                                ))}
                                <FormItem
                                label="类型:"
                                required={true}
                                requiredMessage="必填"
                                >
                                <Select
                                    id="bookType"
                                    name="bookType"
                                    dataSource={bookTypeList}
                                    defaultValue={isEdit ? bookInfo['bookType'] : bookTypeList[0]}
                                />
                                </FormItem>
                                <FormItem wrapperCol={{ offset: 6 }} labelTextAlign='right' >
                                    <Form.Submit loading={isEdit ? updateLoading : addLoading} validate type="primary" onClick={(v) => handleSubmit(v)} style={{ marginRight: 10 }}>保存</Form.Submit>
                                </FormItem>
                            </Form>
                    </Dialog>
                </div>
            </Cell>
        </ResponsiveGrid>
    );
}

export default Books;