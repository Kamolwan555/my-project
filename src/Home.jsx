import { Card, Table } from "antd";
import { useEffect, useState } from "react";

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
        .then((res) => setData(res));
    };
    fetchDashboard();
  }, []);

  if (!data) return <span>Loading data...</span>;
  return (
    <>
      <Card>{data.total_orders_today}</Card>
      <Table dataSource={data.orders} columns={columns} />
    </>
  );
};

export default Home;
