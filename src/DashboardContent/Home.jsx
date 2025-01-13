import { useEffect, useState } from "react";
import { Table, Card, Typography, Modal, Button, ConfigProvider } from "antd";
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
          backgroundColor: getStatusColor(record.status),
          marginRight: 8,
        }}
      ></span>
    ),
  },
  {
    title: "ชื่อ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ที่อยู่",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "ข้อมูล",
    dataIndex: "data",
    key: "data",
  },
  {
    title: "วันที่",
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "อีเมล",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "เบอร์โทร",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    key: "status",
  },
];

const Home = () => {
  const [data, setData] = useState();
  const [statusModal, setStatusModal] = useState({ visible: false, status: "" });

  useEffect(() => {
    const fetchDashboard = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      fetch(`${import.meta.env.VITE_APP_API_HOST}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the JWT token
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err);
        });
    };

    fetchDashboard();
  }, []);

  const handleRowClick = (record) => {
    setStatusModal({ visible: true, status: record.status });
  };

  const closeModal = () => {
    setStatusModal({ visible: false, status: "" });
  };

  if (!data) return <span>Loading data...</span>;

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
          {[
            {
              title: "Order วันนี้",
              value: data?.total_orders_today || 0,
              color: "#32CD32",
            },
            {
              title: "ออเดอร์ทั้งหมด",
              value: data?.all_order || 0,
              color: "#32CD32",
            },
            {
              title: "รายการที่กำลังดำเนินการ",
              value: data?.in_progress_count || 0,
              color: "#32CD32",
            },
            {
              title: "รายการที่เสร็จสิ้นแล้ว",
              value: data?.completed_count || 0,
              color: "#32CD32",
            },
          ].map((item, index) => (
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
          <Title level={5} style={{ marginBottom: 20 }}>
            คำสั่งซื้อ
          </Title>
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
          title="Order Status"
          visible={statusModal.visible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Close
            </Button>,
          ]}
        >
          <p>{statusModal.status}</p>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Home;
