import "../DashboardContent/css/index.css";
import { Table, Modal, Button, Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStatusColor = (status) => {
  switch (status) {
    case "In progress":
      return "#FFA500";
    case "Completed":
      return "#32CD32";
    case "Pending":
      return "#F0E68C";
    case "Canceled":
      return "#f80000";
    default:
      return "#D3D3D3";
  }
};

const columns = [
  {
    title: "",
    key: "statusDot",
    render: (_, record) => (
      <span
        style={{
          display: "inline-block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: getStatusColor(record.status),
          marginRight: 8,
        }}
      ></span>
    ),
  },
  { title: "ชื่อ", dataIndex: "name", key: "name" },
  { title: "ที่อยู่", dataIndex: "address", key: "address" },
  { title: "ข้อมูล", dataIndex: "data", key: "data" },
  { title: "วันที่", dataIndex: "order_date", key: "order_date" },
  { title: "อีเมล", dataIndex: "email", key: "email" },
  { title: "เบอร์โทร", dataIndex: "number", key: "number" },
  { title: "สถานะ", dataIndex: "status", key: "status" },
];

const Order = () => {
  const [dataa, setData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/orderlist`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const handleAddOrderSubmit = async (values) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://127.0.0.1:5000/order`,
        { ...values },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      toast.success(response.data.message || "Order added successfully!");
      setAddOrderModalOpen(false);
      form.resetFields();

      // Refresh order list
      const updatedOrders = await axios.get(
        `http://127.0.0.1:5000/orderlist`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setData(updatedOrders.data);
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order. Please try again.");
    }
  };

  if (!dataa) return <span>Loading data...</span>;

  return (
    <div className="container">
      <div className="header">
        <p className="subtitle">คำสั่งซื้อ</p>
        <Button
          type="primary"
          onClick={() => setAddOrderModalOpen(true)}
        >
          เพิ่มคำสั่งซื้อ
        </Button>
      </div>

      {/* Order Table */}
      <Table
        className="custom-font-table"
        dataSource={dataa.orders || []}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            ปิด
          </Button>,
        ]}
      >
        {selectedOrder ? (
          <div>
            <p><strong>ชื่อ:</strong> {selectedOrder.name}</p>
            <p><strong>สถานะ:</strong> {selectedOrder.status}</p>
            <p><strong>อีเมล:</strong> {selectedOrder.email}</p>
            <p><strong>เบอร์โทร:</strong> {selectedOrder.number}</p>
          </div>
        ) : (
          <p>No order selected</p>
        )}
      </Modal>

      {/* Add Order Modal */}
      <Modal
        title="เพิ่มคำสั่งซื้อใหม่"
        visible={addOrderModalOpen}
        onCancel={() => setAddOrderModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleAddOrderSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="ชื่อผู้ซื้อ"
            rules={[{ required: true, message: "โปรดระบุชื่อผู้ซื้อ!" }]}
          >
            <input type="text" placeholder="ชื่อผู้ซื้อ" />
          </Form.Item>
          <Form.Item
            name="address"
            label="ที่อยู่"
            rules={[{ required: true, message: "โปรดระบุที่อยู่!" }]}
          >
            <input type="text" placeholder="ที่อยู่" />
          </Form.Item>
          <Form.Item
            name="data"
            label="ข้อมูลคำสั่งซื้อ"
            rules={[{ required: true, message: "โปรดระบุข้อมูลคำสั่งซื้อ!" }]}
          >
            <input type="text" placeholder="ข้อมูลคำสั่งซื้อ" />
          </Form.Item>
          <Form.Item
            name="number"
            label="เบอร์โทรศัพท์"
            rules={[{ required: true, message: "โปรดระบุเบอร์โทรศัพท์!" }]}
          >
            <input type="text" placeholder="เบอร์โทรศัพท์" />
          </Form.Item>
          <Form.Item
            name="email"
            label="อีเมล"
            rules={[{ type: "email", required: true, message: "โปรดระบุอีเมลของคุณ!" }]}
          >
            <input type="email" placeholder="อีเมล" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            บันทึก
          </Button>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Order;
