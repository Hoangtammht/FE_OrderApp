import React from 'react';
import { Table, Avatar, Tag, Typography, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Management.css'; // Add any additional CSS if needed


const { Title } = Typography;

// Example user data
const users = [
  { userID: 2, userName: 'teacher01', fullName: 'Teacher One', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 3, userName: 'teacher02', fullName: 'Teacher Two', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 4, userName: 'teacher03', fullName: 'Teacher Three', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 5, userName: 'teacher04', fullName: 'Teacher Four', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 6, userName: 'teacher05', fullName: 'Teacher Five', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 7, userName: 'teacher06', fullName: 'Teacher Six', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 8, userName: 'teacher07', fullName: 'Teacher Seven', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 9, userName: 'teacher08', fullName: 'Teacher Eight', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 10, userName: 'teacher09', fullName: 'Teacher Nine', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 11, userName: 'teacher10', fullName: 'Teacher Ten', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 12, userName: 'teacher11', fullName: 'Teacher Eleven', roleID: 2, createdAt: '2024-09-23T21:55:52' },
  { userID: 13, userName: 'teacher12', fullName: 'Teacher Twelve', roleID: 2, createdAt: '2024-09-23T21:55:52' },
];

// Define columns for the table
const columns = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Username',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Role',
    dataIndex: 'roleID',
    key: 'roleID',
    render: (roleID: number) => {
      const roleMap: { [key: number]: string } = {
        1: 'Admin',
        2: 'Teacher',
        3: 'Student',
      };
      return <Tag color="blue">{roleMap[roleID] || 'Unknown'}</Tag>; // Handle unknown roles
    },
  },  
];

const Management = () => {
  return (
    <div className="management-content">
      <Title level={2}>User Management</Title>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 7 }}
        rowKey="userID"
        bordered
        scroll={{ x: 'max-content' }} // Enable horizontal scrolling
      />
    </div>
  );
};

export default Management;
