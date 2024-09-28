import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ChefSlider from './ChefSlider';
import MenuManage from './MenuManage';
import ChefOrder from './ChefOrder';

const { Content, Sider } = Layout;

const ChefScreen = () => {
 

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-layout">
      <Sider width={250}  breakpoint="lg" collapsedWidth="0" trigger={null}>
        <ChefSlider />
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/chef-manage" replace />} />
            <Route path="/chef-manage" element={<MenuManage />} />
            <Route path="/chef-order" element={<ChefOrder />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default () => (
  <BrowserRouter>
    <ChefScreen />
  </BrowserRouter>
);
