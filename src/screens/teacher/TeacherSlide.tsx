import { Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../reduxs/reducers/authReducer';

const TeacherSlide = () => {
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
        <Menu mode="vertical" defaultSelectedKeys={['menu']}>
          <Menu.Item key="menu" icon={<HomeOutlined />} onClick={() => navigate('/teacher-menu')}>
            Thực đơn
          </Menu.Item>
          <Menu.Item key="order" icon={<FileTextOutlined />} onClick={() => navigate('/teacher-order')}>
            Đặt hàng
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </div>
    );
}

export default TeacherSlide