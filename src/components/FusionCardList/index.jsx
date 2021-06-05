import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, ResponsiveGrid, Divider, Typography, Icon, Loading, Button, Dialog, Form, Input, Field , NumberPicker, Balloon, Grid, Message } from '@alifd/next';
import styles from './index.module.scss';
import Img from '@icedesign/img';
import {useRequest} from 'ice';
import bookService from '@/service/book';
import cartService from '@/service/cart';


const { Group: TagGroup, Selectable: SelectableTag } = Tag;
const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const { Row, Col } = Grid;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const link = ['查看图书详情', '加入购物车'];

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

const formItemList = [
  {
    label: "ISBN:",
    name: "ISBN",
    required: false,
    requiredMessage: "必填",
  },
  {
    label: "图书名称:",
    name: "bookName",
    required: false,
    requiredMessage: "必填",
  },
  {
    label: "作者:",
    name: "bookAuthor",
    required: false,
    requiredMessage: "必填",
  },
  {
    label: "库存:",
    name: "bookAmount",
    required: false,
    requiredMessage: "必填",
  },
  {
    label: "价格:",
    name: "bookPrice",
    required: false,
    requiredMessage: "必填",
  },
  {
    label: "类型:",
    name: "bookType",
    required: false,
    requiredMessage: "必填",
  },
]

const CardList = () => {
  const [bookList, setBookList] = useState([]);
  const [bookInfo, setBookInfo] = useState();
  const { loading: getBookListLoading, request: getBookList} = useRequest(bookService.getBookList);
  const { loading: getBookByNameLoading, request: getBooksByName} = useRequest(bookService.getBooksByName);
  const { loading: getBooksByAuthorLoading, request: getBooksByAuthor} = useRequest(bookService.getBooksByAuthor);
  const { loading: getBooksByTypeLoading, request: getBooksByType} = useRequest(bookService.getBooksByType);
  const { loading: getBookByIdLoading, request: getBookById} = useRequest(bookService.getBookById);
  const { loading: getBookByISBNLoading, request: getBookByISBN} = useRequest(bookService.getBookByISBN);


  const [cart, setCart] = useState();
  const { loading: addToCartLoading, request: addToCart} = useRequest(cartService.addToCart);
  const { loading: getCartLoading, request: getCart} = useRequest(cartService.getCart);
  const {loading: deleteCartItemLoading, request: deleteCartItem} = useRequest(cartService.deleteCartItem);
  //搜索框的值
  const [value, setValue] = useState('');
  
  const [visible, setVisible] = useState(false);
  const [isPreview, setIsPreview] = useState(true);

  const field = Field.useField([]);
  useEffect(() => {
    field.reset();
    if (bookInfo) {
      console.log(`bookInfo`, bookInfo);
      const newValues = {
        bookId: bookInfo.bookId,
        ISBN: bookInfo.isbn,
        bookName: bookInfo.bookName,
        bookAuthor: bookInfo.bookAuthor,
        bookAmount: bookInfo.bookAmount,
        bookPrice: bookInfo.bookPrice,
        bookType: bookInfo.bookType,
      };
      field.setValues(newValues);
    }
  }, [field, bookInfo]);

  useEffect(() => {
    getBookListData();
    getCartData();
  }, []);

  const getBookListData = async () => {
    const res = await getBookList();
    console.log(`res`, res);
    if (res.success === true) {
        setBookList(res.detail);
    }
  }

  const getCartData = async () => {
    const res = await getCart();
    console.log(`resCart`, res);
    if (res.success === true) {
        setCart(res.detail);
    }
  }


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

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const onOpen = () => {
    setVisible(true);
    setIsPreview(true);
  };

  const onClose = reason => {
    console.log(reason);
    setVisible(false);
    setBookInfo();
  };

  const viewBookDetails = (book) => {
    setBookInfo(book);
    onOpen();
  };

  const addToShoppingCart = (book) => {
    setBookInfo(book);
    setVisible(true);
    setIsPreview(false);
  };

  const onNumberChange = (value, e) => {
    console.log(value, e.type, e.triggerType);
  }

  const renderCards = () => {
    return bookList.map((book, i) => (
      <Cell colSpan={3} className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <img src="https://shadow.elemecdn.com/app/element/list.76b098b1-1732-11ea-948d-7d2ddf6d1c39.png" alt="img" />
          <div className={styles.content}>
            <div className={styles.title}>{book.bookName}</div>
            <div className={styles.info}>
              {"价格：" + book.bookPrice + "元"}
            </div>
            <div className={styles.link}>
              <a className={styles.item} onClick={()=>{viewBookDetails(book)}}>{link[0]}</a>
              <a className={styles.item} onClick={()=>{addToShoppingCart(book)}}>{link[1]}</a>
            </div>
          </div>
        </div>
      </Cell>
    ));
  };

  const renderBookDetails = () => {
    return <Form
              isPreview={true}
              fullWidth
              labelAlign="left"
              {...formItemLayout}
              field={field}
            >
              {formItemList.map(item => (
                <FormItem label={item.label} required={item.required} key={item.label} 
                        requiredMessage={item.requiredMessage}>
                          <Input name={item.name}/>
                </FormItem>
              ))}
          </Form>
  }

  const onCartItemNumberChange = (value, e) => {
    console.log(value, e.type, e.triggerType);
  }

  const onCorrect = (obj) => {
    console.log('onCorrect', obj);
  }

  const handleSubmit = async (value) => {
    console.log(`value`, value);
    const res = await addToCart(bookInfo.bookId, value.amount);
    console.log(`res`, res);
    if (res.success === true) {
      Message.success(res.msg);
    } else {
      Message.error(res.msg);
    }
    setVisible(false);
    getCartData();
  }

  const renderAddToCart = () => {
    return <Form fullWidth labelAlign="left" {...formItemLayout}>
            <FormItem label="数量：" required={true} requiredMessage="必填">
              <NumberPicker type="inline" min={0} max={30} defaultValue={1} name="amount"
                onCorrect={onCorrect}
                onChange={onCartItemNumberChange}/>
            </FormItem>
            <FormItem wrapperCol={{ offset: 10 }} labelTextAlign='right' >
              <Form.Submit loading={addToCartLoading} validate type="primary" onClick={(v) => handleSubmit(v)} style={{ marginRight: 10 }}>提交</Form.Submit>
            </FormItem>
          </Form>
  }

  const handleDeleteCartItem = async (bookId) => {
    await deleteCartItem(bookId);
    await getCartData();
  }

  const renderCart = () => {
    return <div style={{height: "365px", weight: "600px"}}>
              <span><strong>最近加入的商品</strong></span>
              <Divider></Divider>
              <div style={{height: "240px",weight: "600px" ,overflow: "auto"}} >
                {cart && cart.items && cart.items.map(item => (
                  <div className={styles.card} key={item.bookId}>
                    <Row>
                      <Col>
                        <span>{item.bookName}</span><br/>
                        <span>{item.bookAuthor}</span>
                      </Col>
                      <Col>
                        <span>¥{item.price} x {item.count}</span><br/>
                        <a onClick={()=>{handleDeleteCartItem(item.bookId)}}>删除</a>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
              <div className={styles.cartBottom}>
                <Row>
                  <Col><span>共{cart ? cart.countNum : 0}件商品</span></Col>
                  <Col offset="10"><Button type="primary" key="action2" text>去购物车</Button></Col>
                </Row>
              </div>
          </div>
  }

  return (
    <>
      <Card free className={styles.CardList}>
        <div style={{height: "20px"}}></div>
        <Row>
            <Col span="8"/>
            <Col span="8" align="center">
              <Search shape="normal" size="medium" style={{width: '500px'}} type="primary"
                                        onChange={onChange} onSearch={onSearch}
                                        filterProps={{autoWidth: false}} defaultFilterValue={filter[0].value}
                                        filter={filter} onFilterChange={onFilterChange}/>
            </Col>
            <Col span="8">
              <Balloon style={{ height: 365,width: 600 }} trigger={<Button type="secondary" size="medium"  style={{margin: '10px'}}>我的购物车</Button>} closable={false}>
                {renderCart()}
              </Balloon>
            </Col>
        </Row>
        <Divider
          dashed
          style={{
            margin: '24px 0',
          }}
        />
      </Card>
      <ResponsiveGrid gap={20} loading={getBookListLoading}>
        {renderCards()}
      </ResponsiveGrid>
      <Dialog
        title="图书详情"
        isFullScreen
        footerAlign="center"
        visible={visible}
        style={{ width: 600 }}
        footer={false}
        onClose={onClose}>
          {isPreview ? renderBookDetails() : renderAddToCart()}
      </Dialog>
    </>
  );
};

export default CardList;
