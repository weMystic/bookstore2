import React , { useState, useEffect } from 'react';
import { Table, Button, NumberPicker, Divider } from '@alifd/next';
import {useRequest} from 'ice';
import cartService from '@/service/cart';

const columns = [
  {
    title: '商品Id',
    dataIndex: 'bookId'
  },
  {
      title: '商品',
      dataIndex: 'product'
  },
  {
      title: '单价',
      dataIndex: 'unitPrice'
  },
  {
      title: '数量',
      dataIndex: 'amount'
  },
  {
    title: '小计',
    dataIndex: 'subTotal'
  },
];

const UserCart = () => {

  const [cart, setCart] = useState();
  const {loading: getCartLoading, request: getCart} = useRequest(cartService.getCart);
  const {loading: deleteCartItemLoading, request: deleteCartItem} = useRequest(cartService.deleteCartItem);
  const {loading: changeItemCountLoading, request: changeItemCount} = useRequest(cartService.changeItemCount);
  const {loading: checkItemLoading, request: checkItem} = useRequest(cartService.checkItem);

  const [rowSelection, setRowSelection] = useState({
    onChange: (ids, records) => {
      console.log(`ids, records`, ids, records)
      rowSelection.selectedRowKeys = ids;
      const rowSelectionCopy = {...rowSelection};
      rowSelectionCopy.selectedRowKeys = ids;
      setRowSelection(rowSelectionCopy);
    },
    onSelect: (selected, record, records) => {
      rowSelection.selectedRowKeys = record.amount;
      console.log('onSelect', selected, record, records);
      setRowSelection(rowSelection);
    },
    onSelectAll: function(selected, records) {
        console.log('onSelectAll', selected, records);
    },
    selectedRowKeys: [],
    getProps: (record) => {
        return {
            // disabled: record.amount === 10
        };
    }
  });
  
  useEffect(() => {
    setRowSelection({
      ...rowSelection,
      selectedRowKeys: (cart && cart.items) ? cart.items.map(item => item.bookId) : []
    })
  }, [cart]);
  

  const clear = () => {
      rowSelection.selectedRowKeys = [];
      setRowSelection(rowSelection);
  }

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    const res = await getCart();
    if (res.success === true) {
      setCart(res.detail);
    }
  };
  
  const handleDeleteData = async (record) => {
    console.log(record);
    await deleteCartItem(record.bookId);
    await getCartData();
  };

  const onChange = async (value, e, record) => {
    await changeItemCount(record.bookId, value);
    await getCartData();
  }

  const renderHandleAmount = (value, index, record) => {
    return <NumberPicker value={value} min={1} type="inline" onChange={(v, e)=>onChange(v, e, record)}/>;
  };

  const renderHandleOperation = (value, index, record) => {
    return <Button type="primary" text onClick={()=>handleDeleteData(record)}> 删除</Button>;
  };


  return (
    <div>
      <div>
          <Table primaryKey='bookId' dataSource={(cart && cart.items) ? cart.items : []} loading={getCartLoading} hasBorder={false}  
            rowSelection={rowSelection}
          >
              <Table.Column key="商品Id" title="商品Id" dataIndex="bookId" />
              <Table.Column key="商品" title="商品" dataIndex="bookName" />
              <Table.Column key="单价" title="单价" dataIndex="price" />
              <Table.Column key="数量" title="数量" dataIndex="count" cell={(v, i, r)=>renderHandleAmount(v, i, r)} />
              <Table.Column key="小计" title="小计" dataIndex="totalPrice" />
              <Table.Column key="操作" title="操作" dataIndex="operation" cell={(v, i, r)=>renderHandleOperation(v, i, r)} />
          </Table>
      </div>
    </div>
  );
}

export default UserCart;
