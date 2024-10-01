import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../reduxs/reducers/authReducer';
import AdminSidebar from './AdminSidebar';
import AdminDashboardContent from './AdminDashboard';
import Management from './Management';
import { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader'; // Import the AdminHeader component
import './AdminScreen.css';

const { Content, Sider } = Layout;

const AdminScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const location = useLocation();
  const auth = useSelector(authSelector);

  // const closeDrawer = () => {
  //   setDrawerVisible(false);
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       closeDrawer();
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [location]);

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-layout">
      {/* <Sider width={250}  breakpoint="lg" collapsedWidth="0" trigger={null} collapsed={!drawerVisible}> */}
      <Sider width={250}  breakpoint="lg" collapsedWidth="0" trigger={null}>
        <AdminSidebar />
      </Sider>
      <Layout>
        {/* <AdminHeader setDrawerVisible={setDrawerVisible} auth={auth} /> */}
        <AdminHeader auth={auth} />
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<AdminDashboardContent />} />
            <Route path="/management" element={<Management />} />
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
