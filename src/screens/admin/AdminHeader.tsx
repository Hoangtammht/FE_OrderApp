import { Layout, Avatar, Typography, Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import './Header.css'; // Add any additional CSS if needed
import { useSelector } from 'react-redux'; // Import selector hook
import { authSelector } from '../../reduxs/reducers/authReducer'; // Import your auth selector

const { Header } = Layout;
const { Text } = Typography;

interface AdminHeaderProps {
  setDrawerVisible: (visible: boolean) => void; // Function to set drawer visibility
  auth: { fullName: string }; // Define the auth prop type
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setDrawerVisible, auth }) => {
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  return (
    <Header className="header" style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        onClick={showDrawer}
        type="primary"
        icon={<MenuOutlined style={{ color: '#fff' }} />} // Set icon color to white
        style={{ marginLeft: '16px', backgroundColor: '#000', borderColor: '#000', color: '#fff' }}
      />
      <div className="header-left">
        <Text className="header-title" strong style={{ fontSize: '18px' }}>Admin Dashboard</Text>
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} />
          <Text style={{ marginLeft: '10px' }}>{auth.fullName || 'Admin'}</Text>
        </div>
      </div>
    </Header>
  );
};

export default AdminHeader;
