import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress, Container, Grid, TextField, Typography, Paper } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"; // นำเข้า ArrowBackIcon
import { message } from "antd";

const EditOrder = () => {
  const { orderId } = useParams(); // ใช้ useParams เพื่อดึงค่า orderId จาก URL
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

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

  if (loading) return <CircularProgress style={{ display: "block", margin: "50px auto" }} />;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: 2,
          marginTop: 1, // เพิ่ม marginTop เพื่อขยับปุ่มขึ้นด้านบน
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: '#38b000',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(56, 176, 0, 0.1)',
            },
          }}
        >
          ย้อนกลับ
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "black" }}>
          แก้ไขคำสั่งซื้อ
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Customer Name"
                defaultValue={order?.name || ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                defaultValue={order?.address || ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="plant"
                name="plant"
                label="Plant"
                defaultValue={order?.plant || ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="order_date"
                name="order_date"
                label="Order Date"
                type="date"
                defaultValue={order?.order_date ? new Date(order.order_date).toISOString().split('T')[0] : ''}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="plant_number"
                name="plant_number"
                label="Plant Number"
                defaultValue={order?.plant_number || ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                defaultValue={order?.quantity || ''}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="order_status"
                name="order_status"
                label="Status"
                defaultValue={order?.order_status || ''}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '150px' }}
            >
              บันทึก
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditOrder;