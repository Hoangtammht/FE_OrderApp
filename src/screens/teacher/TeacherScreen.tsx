import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../reduxs/reducers/authReducer';
import { useState } from 'react';
import TeacherSlide from './TeacherSlide';
import TeacherMenu from './TeacherMenu';
import TeacherOrder from './TeacherOrder';


const { Content, Sider } = Layout;

const AdminScreen = () => {
 
  const auth = useSelector(authSelector);


  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-layout">
      <Sider width={250}  breakpoint="lg" collapsedWidth="0" trigger={null}>
        <TeacherSlide />
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/teacher-menu" replace />} />
            <Route path="/teacher-menu" element={<TeacherMenu />} />
            <Route path="/teacher-order" element={<TeacherOrder userName={auth.userName}/>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default () => (
  <BrowserRouter>
    <AdminScreen />
  </BrowserRouter>
);
