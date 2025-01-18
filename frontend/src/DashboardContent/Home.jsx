import { useEffect, useState } from "react";
import { Table, Card, Typography, Modal, Tag, Button, ConfigProvider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../DashboardContent/css/index.css";

const { Title } = Typography;

const getStatusColor = (status) => {
  switch (status) {
    case "In progress":
      return "#FFA500"; // Orange
    case "Completed":
      return "#32CD32"; // Lime Green
    case "Pending":
      return "#F0E68C"; // Khaki
    case "Canceled":
      return "#f80000"; // Red
    default:
      return "#D3D3D3"; // Gray for unknown status
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
          backgroundColor: getStatusColor(record.order_status),
          marginRight: 8,
        }}
      ></span>
    ),
  },
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

const Home = () => {
  const [data, setData] = useState(null);  // เริ่มต้น data เป็น null เพื่อรอการโหลดข้อมูล
  const [statusModal, setStatusModal] = useState({ visible: false, orderDetails: {} });

  useEffect(() => {
    const fetchDashboard = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      fetch(`http://127.0.0.1:5000/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // ใช้ JWT token
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);  // ตั้งค่า data จาก response
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err);
        });
    };

    fetchDashboard();
  }, []);

  const handleRowClick = (record) => {
    setStatusModal({
      visible: true,
      orderDetails: record,  // ส่งข้อมูลออเดอร์ทั้งหมดเข้ามาใน modal
    });
  };

  const closeModal = () => {
    setStatusModal({ visible: false, orderDetails: {} });
  };

  if (!data) return <span>Loading data...</span>;  // ถ้ายังไม่มีข้อมูลจะแสดงข้อความนี้

  const { orderDetails } = statusModal;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Noto Sans Thai', sans-serif",
        },
      }}
    >
      <div style={{ padding: 30 }}>
        <ToastContainer />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {[{
            title: "Order วันนี้",
            value: data?.summary.total_orders_today || 0,
            color: "#08bb00",
          },
          {
            title: "รายการที่รอการตอบรับ",
            value: data?.summary.in_progress_count || 0,
            color: "#08bb00",
          },
          {
            title: "sensor avilable",
            value: data?.summary.status_free || 0,
            color: "#08bb00",
          },
          {
            title: "sensor in used",
            value: data?.summary.in_progress_count || 0,
            color: "#08bb00",
          }].map((item, index) => (
            <div key={index}>
              <Card
                bordered={false}
                style={{
                  textAlign: "center",
                  backgroundColor: item.color,
                  padding: 8,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  color: "white",
                }}
              >
                <h2>{item.title}</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{item.value}</p>
              </Card>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ marginBottom: 20 }}>คำสั่งซื้อ</Title>
          <Table
            className="custom-font-table"
            dataSource={data.orders}
            columns={columns}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
        <Modal
          title={`Order ID: ${orderDetails.id}`}
          visible={statusModal.visible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>Close</Button>,
          ]}
        >
          <div>
            <p><strong>Customer Name:</strong> {orderDetails.name}</p>
            <p><strong>Address:</strong> {orderDetails.address}</p>
            <p><strong>Plant:</strong> {orderDetails.plant}</p>
            <p><strong>Order Date:</strong> {orderDetails.order_date ? new Date(orderDetails.order_date).toLocaleDateString() : "N/A"}</p>
            <p><strong>Plant Number:</strong> {orderDetails.plant_number}</p>
            <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
            <p><strong>Status:</strong> {orderDetails.order_status}</p>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Home;
