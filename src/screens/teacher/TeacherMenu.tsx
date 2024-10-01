import { Table, DatePicker, message, Avatar, Typography, Button, Modal, Form, Select, InputNumber } from 'antd';
import 'antd/dist/reset.css';
import { UserOutlined } from '@ant-design/icons';
import '../chef/MenuManage.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Header } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import { authSelector } from '../../reduxs/reducers/authReducer';
import MenuHandleApi from '../../apis/MenuHandleApi';


const { Text } = Typography;
const { Option } = Select;

interface MenuData {
    key: string;
    time: string;
    thu2: string | JSX.Element;
    thu3: string | JSX.Element;
    thu4: string | JSX.Element;
    thu5: string | JSX.Element;
    thu6: string | JSX.Element;
}
interface MenuItem {
    scheduleID: 1 | 2 | 3;
    dishName: string;
    serveDate: string;
    quantity: number;
}
interface OrderItem {
    menuID: string;
    dishName: string;
}

const createStyledMeals = (meals: { dishName: string; quantity: number }[]): JSX.Element => {
    return (
        <>
            {meals.map((meal, index) => (
                <div key={index} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {meal.dishName} (Số lượng: {meal.quantity})
                </div>
            ))}
        </>
    );
};

export function TeacherMenu() {
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [orderData, setOrderData] = useState<OrderItem[]>([]);
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(moment());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const auth = useSelector(authSelector);

    const fetchWeeklyMenuData = async (date: moment.Moment) => {
        const newMenuData: MenuData[] = [];
        const scheduleNames = ['Sáng', 'Trưa', 'Chiều'];

        const startOfWeek = date.clone().startOf('isoWeek');

        const scheduleGrouped: { [key: number]: { [key: number]: { dishName: string; quantity: number }[] } } = {
            1: {},
            2: {},
            3: {},
        };

        for (let j = 1; j <= 3; j++) {
            for (let i = 0; i < 5; i++) {
                scheduleGrouped[j][i] = [];
            }
        }

        for (let i = 0; i < 5; i++) {
            const currentDate = startOfWeek.clone().add(i, 'days');
            const formattedDate = currentDate.format('YYYY-MM-DD');

            try {
                const response = await MenuHandleApi(`/menu/getMenuByDate?serveDate=${formattedDate}`, {}, 'get');
                const data: MenuItem[] = response.data;

                data.forEach((menuItem: MenuItem) => {
                    const { scheduleID, dishName, serveDate, quantity } = menuItem;
                    const serveDateMoment = moment(serveDate);
                    const dayIndex = serveDateMoment.isoWeekday() - 1;

                    if (dayIndex >= 0 && dayIndex < 5) {
                        scheduleGrouped[scheduleID][dayIndex].push({ dishName, quantity });
                    }
                });
            } catch (error) {
            }
        }

        for (let j = 1; j <= 3; j++) {
            newMenuData.push({
                key: j.toString(),
                time: scheduleNames[j - 1],
                thu2: createStyledMeals(scheduleGrouped[j][0] || []),
                thu3: createStyledMeals(scheduleGrouped[j][1] || []),
                thu4: createStyledMeals(scheduleGrouped[j][2] || []),
                thu5: createStyledMeals(scheduleGrouped[j][3] || []),
                thu6: createStyledMeals(scheduleGrouped[j][4] || []),
            });
        }

        setMenuData(newMenuData);
    };

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            const startOfWeek = date.clone().startOf('isoWeek');
            setSelectedDate(startOfWeek);
            fetchWeeklyMenuData(startOfWeek);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchWeeklyMenuData(selectedDate);
        }
    }, [selectedDate]);

    const handleOrderMeal = async (values: any) => {
        try {
            const payload = {
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                menuID: values.menuID,
                quantity: values.quantity
            };

            await MenuHandleApi('/order/createOrder', payload, 'post');
            message.success('Đặt món ăn thành công');
            setIsModalVisible(false);
            form.resetFields();
            fetchWeeklyMenuData(selectedDate!);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }
    };

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            fixed: 'left' as 'left',
        },
        {
            title: 'Thứ 2',
            dataIndex: 'thu2',
            key: 'thu2',
        },
        {
            title: 'Thứ 3',
            dataIndex: 'thu3',
            key: 'thu3',
        },
        {
            title: 'Thứ 4',
            dataIndex: 'thu4',
            key: 'thu4',
        },
        {
            title: 'Thứ 5',
            dataIndex: 'thu5',
            key: 'thu5',
        },
        {
            title: 'Thứ 6',
            dataIndex: 'thu6',
            key: 'thu6',
        },
    ];

    return (
        <div className="menu-container">
            <div style={{ backgroundColor: 'white', borderRadius: 5, padding: '10px' }}>
                <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%', gap: 15 }}>
                    <Text className="header-title" strong style={{ fontSize: '18px', color: 'black', whiteSpace: 'nowrap', marginLeft: 5 }}>
                        Danh sách thực đơn tuần này
                    </Text>
                    <div className="form-items" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                        <DatePicker
                            onChange={handleDateChange}
                            value={selectedDate}
                            format="DD/MM/YYYY"
                            style={{ backgroundColor: '#cacaca', border: 'none', padding: '5px', marginRight: '10px' }}
                            disabled
                        />
                        <Button
                            type="primary"
                            onClick={async () => {
                                setIsModalVisible(true);
                            }}
                            style={{ backgroundColor: 'blue', color: 'white', border: 'none' }}
                        >
                            Đặt món
                        </Button>
                    </div>
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', marginTop: 5, marginLeft: '10px' }}>
                        <Avatar icon={<UserOutlined />} />
                        <Text style={{ marginLeft: '10px' }} className="auth-name">{auth.fullName || 'Đầu bếp'}</Text>
                    </div>
                </div>

                <div className="header-bottom" style={{ marginTop: '10px', width: '100%' }}>
                    {/* Extra content below, if necessary */}
                </div>
            </div>

            <Table<MenuData> columns={columns} dataSource={menuData} pagination={false} bordered style={{ overflowX: 'auto', width: '100%' }} />

            <Modal
                title="Đặt món"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleOrderMeal}>
                    <Form.Item
                        name="serveDate"
                        label="Ngày đặt món"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày đặt món!' }]}
                    >
                        <DatePicker
                            format="DD/MM/YYYY"
                            style={{ width: '100%' }}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            onChange={async (date) => {
                                if (date) {
                                    const formattedDate = date.format('YYYY-MM-DD');
                                    try {
                                        const response = await MenuHandleApi(`/menu/getMenuByDate?serveDate=${formattedDate}`, {}, 'get');
                                        setOrderData(response.data);
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="menuID"
                        label="Món ăn"
                        rules={[{ required: true, message: 'Vui lòng chọn món ăn!' }]}
                    >
                        <Select
                            placeholder="Chọn món ăn"
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="children"
                        >
                            {orderData.map((meal: OrderItem) => (
                                <Option key={meal.menuID} value={meal.menuID}>
                                    {meal.dishName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Số lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <InputNumber min={1} placeholder="Nhập số lượng" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đặt món
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );


}

export default TeacherMenu;
