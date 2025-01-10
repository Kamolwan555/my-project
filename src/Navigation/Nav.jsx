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
    DashboardOutlined,
    DotChartOutlined,
    FileTextOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Layout, Menu, theme } from "antd";

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
    const { token: { borderRadiusLG, colorCustom = '#16a34a' }, } = theme.useToken();

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
            icon: <DashboardOutlined />,
            label: <Link to="/home">หน้าหลัก</Link>,
        },
        {
            key: "/calculate",
            icon: <CalculatorOutlined />,
            label: <Link to="/calculate">คำนวณ</Link>,
        },
        {
            key: "/order",
            icon: <ShoppingOutlined />,
            label: <Link to="/order">คำสั่งซื้อ</Link>,
        },
        {
            key: "/soil",
            icon: <EnvironmentOutlined />,
            label: <Link to="/soil">ตรวจสอบดิน</Link>,
        },
        {
            key: "/fertilizer",
            icon: <DotChartOutlined />,
            label: <Link to="/fertilizer">ตรวจสอบปุ๋ย</Link>,
        },
        {
            key: "/soildata",
            icon: <FileTextOutlined />,
            label: <Link to="/soildata">ชุดข้อมูลดิน</Link>,
        },
        {
            key: "/recommend",
            icon: <ReadOutlined />,
            label: <Link to="/recommend">คำแนะนำ</Link>,
        },
        {
            type: "divider",
        },
        {
            key: "/logout",
            icon: <LogoutOutlined />,
            label: <Link to="/logout">ออกจากระบบ</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: colorCustom }}>
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ backgroundColor: colorCustom }}
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
                    }}
                />
            </Sider>

            {/* Main Layout */}
            <Layout>
                {/* Header */}
                <Header style={{ padding: 0, background: "transparent" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64 }}
                    />
                </Header>

                {/* Content Area */}
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb
                        style={{ margin: "16px 0" }}
                        items={generateBreadcrumbItems()}
                    />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            borderRadius: borderRadiusLG,
                            backgroundColor: "#fff",
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
