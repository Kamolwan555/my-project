import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
MenuFoldOutlined,
MenuUnfoldOutlined,
CalculatorOutlined,
ReadOutlined,
EnvironmentOutlined,
ShoppingOutlined,
DashboardOutlined,
DotChartOutlined,
FileTextOutlined,
LogoutOutlined
} from '@ant-design/icons';
import { Button, Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const Navigation = () => {
const [collapsed, setCollapsed] = useState(false);
const {
token: { colorBgContainer, borderRadiusLG },
} = theme.useToken();
const breadcrumbItems = [
    { title: 'User' },
    { title: 'Bill' },
];

return (
<Layout
            style={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
            }}
        >
    <Sider trigger={null} collapsible collapsed={collapsed} style={{
                    backgroundColor: '#ffffff',
                }}> 
    <div className="demo-logo-vertical" />
    <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
        {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link to="/Home">หน้าหลัก</Link>,
        },
        {
            key: '2',
            icon: <CalculatorOutlined />,
            label: <Link to="/calculate">คำนวณ</Link>,
        },
        {
            key: '3',
            icon: <ShoppingOutlined />,
            label: <Link to="/order">คำสั่งซื้อ</Link>,
        },
        {
            key: '4',
            icon: <EnvironmentOutlined />,
            label: <Link to="/soil">ตรวจสอบดิน</Link>,
        },
        {
            key: '5',
            icon: <DotChartOutlined />,
            label: <Link to="/fertilizer">ตรวจสอบปุ๋ย</Link>,
        },
        {
            key: '6',
            icon: <FileTextOutlined />,
            label: <Link to="/soildata">ชุดข้อมูลดิน</Link>,
        },
        {
            key: '7',
            icon: <ReadOutlined />,
            label: <Link to="/recommend">คำแนะนำ</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: '8',
            icon: <LogoutOutlined />,
            label: <Link to="/login">ออกจากระบบ</Link>,
        },
        ]}
        
    />
    </Sider>
    <Layout>
    <Header
        style={{
        padding: 0,
        background: colorBgContainer,
        }}
    >
        <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
            fontSize: '16px',
            width: 64,
            height: 64,
        }}
        />
    </Header>
    <Content
                    style={{
                        margin: '0 16px',
                        background: '#f0f2f5',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                        items={breadcrumbItems}
                    />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
    </Layout>
</Layout>
);
};

export default Navigation;
