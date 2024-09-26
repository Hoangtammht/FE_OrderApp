import React from 'react';
import { Table, Button, Select, DatePicker } from 'antd';
import 'antd/dist/reset.css';
import './menuManage.css';

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

// chỗ này mốt call api render ra table
const createStyledMeals = (meals: string[]): JSX.Element => {
    return (
        <>
            {meals.map((meal, index) => (
                <div key={index} style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {meal}
                </div>
            ))}
        </>
    );
};

// data giả các món
const data: MenuData[] = [
    {
        key: '1',
        time: 'Sáng',
        thu2: createStyledMeals(['Bún gà chua ngọt']),
        thu3: createStyledMeals(['Hủ tiếu nam vang']),
        thu4: createStyledMeals(['Bún riêu cua']),
        thu5: createStyledMeals(['Bún gạo thịt nấm rơm']),
        thu6: createStyledMeals(['Bánh canh ghẹ']),
    },
    {
        key: '2',
        time: 'Trưa',
        thu2: createStyledMeals([
            'Canh bí đỏ',
            'yaourt',
            'dưa hấu',
            'Cơm tấm thịt khia',
            'Cháo thịt nhà trẻ',
        ]),
        thu3: createStyledMeals([
            'yaourt',
            'chuối cau',
            'cháo cá nhà trẻ',
            'Gà sốt mắm nhĩ',
            'Canh cải thảo',
        ]),
        thu4: createStyledMeals([
            'yaourt',
            'đu đủ',
            'Lươn xào thập cẩm',
            'Cháo mực thịt bí đỏ nhà trẻ',
            'Canh hẹ',
        ]),
        thu5: createStyledMeals([
            'Thanh long',
            'yaourt',
            'Tôm kho bông cải xanh',
            'Cháo tôm nhà trẻ',
            'Canh thịt đậu hũ non cà chua',
        ]),
        thu6: createStyledMeals([
            'yaourt',
            'dưa hấu',
            'Cá lóc um bầu',
            'Canh rau dền',
            'Cháo gà nhà trẻ',
        ]),
    },
    {
        key: '3',
        time: 'Chiều',
        thu2: createStyledMeals(['Sữa bột', 'Cháo gà nấm rơm']),
        thu3: createStyledMeals(['Súp thập cẩm', 'Sữa bột']),
        thu4: createStyledMeals(['Nui hoành thánh', 'Sữa bột']),
        thu5: createStyledMeals(['Sữa bột', 'bánh mì cá mòi']),
        thu6: createStyledMeals(['Bánh mì Sandwich kẹp trứng', 'Sữa bột']),
    },
];

// cái này là header table nè
const columns = [
    {
        title: 'Thứ',
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

export function MenuManage() {
    const handleExport = () => {
        // tự truyền dữ liệu nha
    };

    return (
        <div className="menu-container">
            <div className="header" >

                <div style={{ display: 'flex', gap: 10 }}>
                    <h3>Thực đơn Tháng 6 (Tuần 2) 12/06 - 18/06/2023</h3>
                    <DatePicker />
                </div>
                <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={handleExport}>Xuất file</Button>
            </div>

            <div className="control-bar">
                <div>
                    <Button type="default">Học sinh</Button>
                    <Button type="default" style={{ marginLeft: 8 }}>Nhân viên</Button>
                </div>
                <div>
                    <Select defaultValue="1" style={{ width: 120 }}>
                        <Option value="1">Tất cả</Option>
                        <Option value="2">Học sinh</Option>
                        <Option value="3">Nhân viên</Option>
                    </Select>
                </div>
            </div>

            <Table<MenuData> columns={columns} dataSource={data} pagination={false} bordered style={{ overflowX: 'auto' }} />

        </div>
    );
};

export default MenuManage;
