import { Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../reduxs/reducers/authReducer';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(removeAuth({}));
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          className='mb-3'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchMBh57b7ExzD_5Tnf_RvKU8nQmB4RbE5Vw&s"
          alt="logo"
          style={{ height: 80, width: 100 }}
        />
      </div>
      <Menu mode="vertical" defaultSelectedKeys={['overview']}>
        <Menu.Item key="overview" icon={<HomeOutlined />} onClick={() => navigate('/overview')}>
          Overview
        </Menu.Item>
        <Menu.Item key="management" icon={<FileTextOutlined />} onClick={() => navigate('/management')}>
          Management
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminSidebar;
