import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, CircularProgress, Container, Grid, TextField, Typography, Paper } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { message } from "antd";

// สร้าง theme และกำหนดสี primary เป็น #38b000
const theme = createTheme({
  palette: {
    primary: {
      main: "#38b000", // เปลี่ยนสี primary เป็น #38b000
    },
  },
  typography: {
    fontFamily: "Sarabun, sans-serif",
  },
});

const EditOrder = () => {
  const { orderId } = useParams(); // ใช้ useParams เพื่อดึงค่า orderId จาก URL
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง
  const [order, setOrder] = useState({
    name: "",
    address: "",
    plant: "",
    order_date: "",
    plant_number: "",
    quantity: "",
    order_status: "",
  });
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('access_token'); // รับ JWT จาก localStorage
      if (!token) {
        message.error("กรุณาล็อกอินก่อน");
        return;
      }

      const response = await axios.put(`http://localhost:5000/orderlist/${orderId}`, order, {
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: 2,
            marginTop: 1,
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
                  label="ชื่อลูกค้า"
                  variant="outlined"
                  value={order.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="ที่อยู่"
                  variant="outlined"
                  value={order.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="plant"
                  label="พืช"
                  variant="outlined"
                  value={order.plant}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="order_date"
                  label="วันที่สั่งซื้อ"
                  type="date"
                  variant="outlined"
                  value={order.order_date ? new Date(order.order_date).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
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
                  label="เลขที่พืช"
                  variant="outlined"
                  value={order.plant_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="quantity"
                  label="จำนวน"
                  type="number"
                  variant="outlined"
                  value={order.quantity}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="order_status"
                  label="สถานะ"
                  variant="outlined"
                  value={order.order_status}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#38b000",
                  "&:hover": { backgroundColor: "#2c8c00" },
              }}
              >
                บันทึก
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default EditOrder;