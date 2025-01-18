import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message, Spin } from "antd";

const EditOrder = () => {
  const { orderId } = useParams(); // ใช้ useParams เพื่อดึงค่า orderId จาก URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('access_token'); // รับ JWT จาก localStorage
        if (!token) {
          message.error("กรุณาล็อกอินก่อน");
          return;
        }

        const response = await axios.get(`http://localhost:5000/orderlist/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`  // ส่ง JWT Token ใน header
          }
        });

        if (response.status === 200) {
          setOrder(response.data);  // ถ้าผลลัพธ์ถูกต้อง จะตั้งค่า order
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

    fetchOrder();
  }, [orderId]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('access_token'); // รับ JWT จาก localStorage
      if (!token) {
        message.error("กรุณาล็อกอินก่อน");
        return;
      }

      const response = await axios.put(`http://localhost:5000/orderlist/${orderId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`  // ส่ง JWT Token ใน header
        }
      });

      if (response.status === 200) {
        message.success("ข้อมูลคำสั่งซื้อถูกบันทึกสำเร็จ");
      } else {
        message.error("ไม่สามารถบันทึกข้อมูลคำสั่งซื้อได้");
      }
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  return (
    <div className="container">
      <h2>แก้ไขคำสั่งซื้อ</h2>
      <Form initialValues={order} onFinish={handleSubmit}>
        <Form.Item name="name" label="Customer Name" rules={[{ required: true, message: "กรุณากรอกชื่อผู้สั่งซื้อ" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="plant" label="Plant" rules={[{ required: true, message: "กรุณากรอกชื่อโรงงาน" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="order_date" label="Order Date" rules={[{ required: true, message: "กรุณากรอกวันที่คำสั่งซื้อ" }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item name="plant_number" label="Plant Number" rules={[{ required: true, message: "กรุณากรอกหมายเลขโรงงาน" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "กรุณากรอกจำนวน" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="order_status" label="Status" rules={[{ required: true, message: "กรุณากรอกสถานะคำสั่งซื้อ" }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            บันทึก
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditOrder;
