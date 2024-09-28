import React, { useEffect, useState } from 'react';
import { Table, Typography, message } from 'antd';
import OrderHandleApi from '../../apis/OrderHandleApi';
import './ChefOrder.css';

const { Title } = Typography;

interface Order {
  dishName: string;
  className: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

const ChefOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const fetchOrders = async () => {
      setLoading(true);
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      try {
        const response = await OrderHandleApi(`/order/getListOrdersByDate?from=${formattedDate}&to=${formattedDate}`, {}, 'get');
        const data = response.data;

        const aggregatedOrders: { [key: string]: Order } = {};

        data.forEach((order: Order) => {
          const key = order.dishName;
          if (aggregatedOrders[key]) {
            aggregatedOrders[key].quantity += order.quantity;
            aggregatedOrders[key].totalPrice += order.totalPrice;
          } else {
            aggregatedOrders[key] = { ...order };
          }
        });

        if (isMounted) {
          setOrders(Object.values(aggregatedOrders));
        }
      } catch (error) {
        if (isMounted) {
          message.error('Có lỗi xảy ra khi tải đơn hàng');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = [
    {
      title: 'Món ăn',
      dataIndex: 'dishName',
      key: 'dishName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => text.split(' ')[1],
    },
  ];

  return (
    <div className="chef-order-container">
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Danh sách Đơn Hàng của Đầu Bếp hôm nay
      </Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record.dishName}
        loading={loading}
        pagination={false}
        bordered
        className="chef-order-table"
      />
    </div>
  );
};

export default ChefOrder;
