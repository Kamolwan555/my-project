import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CalculatorOutlined,
    ReadOutlined,
    EnvironmentOutlined,
    ShoppingOutlined,
    HomeOutlined,
    DotChartOutlined,
    FileTextOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Layout, Menu, theme } from "antd";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const { Header, Sider, Content } = Layout;

const routeBreadcrumbs = {
    "/home": "Home",
    "/calculate": "Calculate",
    "/fertilizer": "Fertilizer",
    "/order": "Order",
    "/soil": "Soil",
    "/recommend": "Recommend",
    "/soildata": "Soil Data",
};

const Navigation = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { token: { borderRadiusLG, colorCustom = '#32CD32', fontFamilyCustom = 'Noto Sans Thai, sans-serif' }, } = theme.useToken();

    // Generate Breadcrumb Items Based on Current Path
    const generateBreadcrumbItems = () => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        return pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return {
                title: <Link to={path}>{routeBreadcrumbs[path] || segment}</Link>,
            };
        });
    };

    const menuItems = [
        {
            key: "/home",
            icon: <HomeOutlined style={{ color: "white" }} />,
            label: <Link to="/home" style={{ color: "white" }}>หน้าหลัก</Link>,
        },
        {
            key: "/calculate",
            icon: <CalculatorOutlined style={{ color: "white" }} />,
            label: <Link to="/calculate" style={{ color: "white" }}>คำนวณ</Link>,
        },
        {
            key: "/order",
            icon: <ShoppingOutlined style={{ color: "white" }} />,
            label: <Link to="/order" style={{ color: "white" }}>คำสั่งซื้อ</Link>,
        },
        {
            key: "/soil",
            icon: <EnvironmentOutlined style={{ color: "white" }} />,
            label: <Link to="/soil" style={{ color: "white" }}>ตรวจสอบดิน</Link>,
        },
        {
            key: "/fertilizer",
            icon: <DotChartOutlined style={{ color: "white" }} />,
            label: <Link to="/fertilizer" style={{ color: "white" }}>ตรวจสอบปุ๋ย</Link>,
        },
        {
            key: "/soildata",
            icon: <FileTextOutlined style={{ color: "white" }} />,
            label: <Link to="/soildata" style={{ color: "white" }}>ชุดข้อมูลดิน</Link>,
        },
        {
            key: "/recommend",
            icon: <ReadOutlined style={{ color: "white" }} />,
            label: <Link to="/recommend" style={{ color: "white" }}>คำแนะนำ</Link>,
        },
        {
            type: "divider",
        },
        {
            key: "/logout",
            icon: <LogoutOutlined style={{ color: "white" }} />,
            label: <Link to="/logout" style={{ color: "white" }}>ออกจากระบบ</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: colorCustom, fontFamily: fontFamilyCustom }}>
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ backgroundColor: colorCustom, fontFamily: fontFamilyCustom }}
            >
                {/* Logo */}
                <div
                    className="flex shrink-0 items-center"
                    style={{ padding: "16px", textAlign: "center" }}
                >
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                        className="h-8 w-auto"
                    />
                </div>

                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{
                        backgroundColor: colorCustom,
                        fontFamily: fontFamilyCustom,
                    }}
                />
            </Sider>

            {/* Main Layout */}
            <Layout>
                {/* Header */}
                <Header style={{ padding: "2px 16px", background: "transparent", fontFamily: fontFamilyCustom }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: "16px", width: 50, height: 50 }}
                        />
                        <Stack direction="row" spacing={2} style={{ marginRight: "18px" }}>
                            <Avatar src="https://github.com/shadcn.png" />
                        </Stack>
                    </div>
                </Header>

                {/* Content Area */}
                <Content style={{ margin: "0 16px", fontFamily: fontFamilyCustom }}>
                    <Breadcrumb
                        style={{ margin: "16px px" }}
                        items={generateBreadcrumbItems()}
                    />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            borderRadius: borderRadiusLG,
                            backgroundColor: "transparent",
                            fontFamily: fontFamilyCustom,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

Navigation.propTypes = {
    children: PropTypes.node,
};

export default Navigation;
