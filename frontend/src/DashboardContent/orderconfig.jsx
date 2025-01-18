import { useEffect, useState } from "react";
import { Table, ConfigProvider, Tag, Spin, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // เพิ่มการใช้งาน useNavigate

const OrderTable = () => {
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อไปยังหน้าแก้ไข
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // ดึงข้อมูลจาก API
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/orderlist");
                if (response.status === 200) {
                    setOrders(response.data.orders); // สมมติว่า response เป็น { orders: [...] }
                } else {
                    message.error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
                }
            } catch (error) {
                console.error(error);
                message.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // กำหนดคอลัมน์ของตาราง
    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Customer Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Plant",
            dataIndex: "plant",
            key: "plant",
        },
        {
            title: "Order Date",
            dataIndex: "order_date",
            key: "order_date",
            render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
        },
        {
            title: "Plant Number",
            dataIndex: "plant_number",
            key: "plant_number",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Status",
            dataIndex: "order_status",
            key: "order_status",
            render: (status) => {
                let color = "blue";
                if (status === "Pending") color = "orange";
                if (status === "Completed") color = "green";
                if (status === "Cancelled") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: '"Noto Sans Thai", serif',
                },
            }}
        >
            <div className="container">
                {loading ? (
                    <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        pagination={{ pageSize: 10 }}
                        rowKey="id"
                        locale={{ emptyText: "ไม่มีข้อมูลคำสั่งซื้อ" }}
                        onRow={(record) => ({
                            onClick: () => {
                                // เมื่อคลิกแถว จะพาไปยังหน้าแก้ไข
                                navigate(`/editorder/${record.id}`);
                            },
                        })}
                    />
                )}
            </div>
        </ConfigProvider>
    );
};

export default OrderTable;
