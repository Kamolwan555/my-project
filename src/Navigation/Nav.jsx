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
    const { token: { borderRadiusLG, colorCustom = '#08bb00', fontFamilyCustom = 'Noto Sans Thai, sans-serif' }, } = theme.useToken();

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
            icon: <HomeOutlined style={{ color: "black" }} />,
            label: <Link to="/home" style={{ color: "black" }}>หน้าหลัก</Link>,
        },
        {
            key: "/calculate",
            icon: <CalculatorOutlined style={{ color: "black" }} />,
            label: <Link to="/calculate" style={{ color: "black" }}>คำนวณ</Link>,
        },
        {
            key: "/order",
            icon: <ShoppingOutlined style={{ color: "black" }} />,
            label: <Link to="/order" style={{ color: "black" }}>คำสั่งซื้อ</Link>,
        },
        {
            key: "/soil",
            icon: <EnvironmentOutlined style={{ color: "black" }} />,
            label: <Link to="/soil" style={{ color: "black" }}>ตรวจสอบดิน</Link>,
        },
        {
            key: "/fertilizer",
            icon: <DotChartOutlined style={{ color: "black" }} />,
            label: <Link to="/fertilizer" style={{ color: "black" }}>ตรวจสอบปุ๋ย</Link>,
        },
        {
            key: "/soildata",
            icon: <FileTextOutlined style={{ color: "black" }} />,
            label: <Link to="/soildata" style={{ color: "black" }}>ชุดข้อมูลดิน</Link>,
        },
        {
            key: "/recommend",
            icon: <ReadOutlined style={{ color: "black" }} />,
            label: <Link to="/recommend" style={{ color: "black" }}>คำแนะนำ</Link>,
        },
        {
            type: "divider",
        },
        {
            key: "/logout",
            icon: <LogoutOutlined style={{ color: "black" }} />,
            label: <Link to="/logout" style={{ color: "black" }}>ออกจากระบบ</Link>,
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
                        src="https://i.postimg.cc/htCbfgrh/freepik-the-style-is-candid-image-photography-with-natural-94126-1.jpg"
                        className="h-8 w-auto"
                    />
                    <p style={{ color: "white" }}>&nbsp;Your Fertilizer</p>


                </div>

                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
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
                            <Avatar src="https://img2.pic.in.th/pic/AdobeStock_370472691_Preview.jpeg" />
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
