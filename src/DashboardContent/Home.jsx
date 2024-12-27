import { Table, Card, Typography } from 'antd'; 
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Title } = Typography;
const columns = [
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
  ];
const Home = () => {
    const [data, setData] = useState();
      useEffect(() => {
        const fetchDashboard = () => {
          fetch(`${import.meta.env.VITE_APP_API_HOST}/dashboard`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
            .then((res) => res.json())
            .then((res) => { setData(res); toast.success("เข้าสู่ระบบสำเร็จ!"); });
        };
        fetchDashboard();
      }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    if (!data) return <span>Loading data...</span>;
    return (
        <div style={{ padding: 30 }}>
          <ToastContainer />
            <Slider {...sliderSettings} style={{ marginBottom: 20 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        <Card
                            bordered={false}
                            style={{ width: '90%', margin: '0 auto' }}
                        >
                            {data.total_orders_today}
                        </Card>
                    </div>
                ))}
            </Slider>
            <div style={{ marginTop: 30 }}>
                <Title level={5} style={{ marginBottom: 20 }}>ตารางคำสั่งซื้อ</Title>
                <Table dataSource={data.orders} columns={columns} />
            </div>
        </div>
    );
};

export default Home;
