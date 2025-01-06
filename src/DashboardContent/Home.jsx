import { Table, Card, Typography, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        
        const hasShownToast = localStorage.getItem("hasShownLoginToast");
  
        fetch(`${import.meta.env.VITE_APP_API_HOST}/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setData(res);
  
            
          })
          .catch((err) => {
            console.error("Failed to fetch dashboard data:", err);
          });
          if (!hasShownToast) {
            toast.success("เข้าสู่ระบบสำเร็จ!");
            localStorage.setItem("hasShownLoginToast", "true"); // Set the flag
          }
      };
  
      fetchDashboard();
    }, []);
    const handleRowClick = (record) => {
      setStatusModal({ visible: true, status: record.status });
    };
  
    const closeModal = () => {
      setStatusModal({ visible: false, status: "" });
    };
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: false,      
                    draggable: false,
                }
            },
        ]
    };
    
    const cardData = [
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
  ];
    if (!data) return <span>Loading data...</span>;
    return (
        <div style={{ padding: 30 }}>
          <ToastContainer />
          <Slider {...sliderSettings}>
                {cardData.map((item, index) => (
                    <div key={index}>
                        <Card
                            bordered={false}
                            style={{
                                width: '90%',
                                margin: '0 auto',
                                textAlign: 'center',
                                backgroundColor: item.color,
                                padding: 20,
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                borderRadius: 10,
                            }}
                        >
                            <h2>{item.title}</h2>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                {item.value}
                            </p>
                        </Card>
                    </div>
                ))}
            </Slider>
            <div style={{ marginTop: 30 }}>
        <Title level={5} style={{ marginBottom: 20 }}>
          ตารางคำสั่งซื้อ
        </Title>
        <Table
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
    );
};

export default Home;
