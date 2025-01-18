// import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import "../DashboardContent/css/index.css";

const { Title, Text } = Typography;

const ModernMenu = () => {
    const menuItems = [
        {
            title: "การตั้งค่าผู้ใช้",
            description: "จัดการข้อมูลผู้ใช้ในระบบ",
            icon: <UserOutlined style={{ fontSize: 48, color: "#1890ff" }} />,
            link: "/userconfig",
        },
        {
            title: "การตั้งค่าคำสั่งซื้อ",
            description: "จัดการข้อมูลคำสั่งซื้อในระบบ",
            icon: <ShoppingOutlined style={{ fontSize: 48, color: "#52c41a" }} />,
            link: "/orderconfig",
        },
    ];

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Row gutter={[16, 16]} justify="center">
                {menuItems.map((item, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                padding: "20px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                            }}
                            onClick={() => window.location.href = item.link}
                        >
                            <div style={{ marginBottom: "16px" }}>{item.icon}</div>
                            <Title level={4}>{item.title}</Title>
                            <Text type="secondary">{item.description}</Text>
                            <div style={{ marginTop: "16px" }}>
                                <Button type="primary" shape="round" size="large">
                                    เข้าสู่เมนู
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ModernMenu;
