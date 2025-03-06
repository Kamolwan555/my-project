import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Typography,
  Modal,
  Button,
  CircularProgress,
  Chip,
  Box,
  Divider,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../DashboardContent/css/index.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import SensorsOffRoundedIcon from "@mui/icons-material/SensorsOffRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";

const getStatusColor = (status) => {
  switch (status) {
    case "In progress":
      return "#1e96fc";
    case "Completed":
      return "#38b000";
    case "Pending":
      return "#ffc300";
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
    render: (record) => (
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
  { title: "#", field: "id" },
  { title: "ชื่อลูกค้า", field: "name" },
  { title: "ที่อยู่", field: "address" },
  { title: "พืช", field: "plant" },
  {
    title: "วันที่สั่งซื้อ",
    field: "order_date",
    render: (record) =>
      record.order_date
        ? new Date(record.order_date).toLocaleDateString()
        : "N/A",
  },
  { title: "รหัสของพืช", field: "plant_number" },
  { title: "จำนวน", field: "quantity" },
  {
    title: "สถานะ",
    field: "order_status",
    render: (record) => {
      let color = "primary";
      if (record.order_status === "Pending") color = "warning";
      if (record.order_status === "Completed") color = "success";
      if (
        record.order_status === "Canceled" ||
        record.order_status === "Cancelled"
      )
        color = "error";
      return <Chip label={record.order_status} color={color} />;
    },
  },
];

const Home = () => {
  const [data, setData] = useState({ summary: {}, orders: [] });
  const [statusModal, setStatusModal] = useState({
    visible: false,
    orderDetails: {},
  });
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchDashboard = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/dashboard", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        toast.error("ไม่สามารถโหลดข้อมูลได้");
      }
    };

    fetchDashboard();
  }, []);


  const handleRowClick = (record) => {
    setStatusModal({
      visible: true,
      orderDetails: record,
    });
  };

  const closeModal = () => {
    setStatusModal({ visible: false, orderDetails: {} });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const handleItemsPerPageChange = (event) => {
  //   setItemsPerPage(event.target.value);
  //   setPage(1);
  // };

  const handleStatusChange = async (newStatus) => {
    const accessToken = localStorage.getItem("accessToken");
    const orderId = statusModal.orderDetails.id;

    // Temporarily update UI before confirming with backend
    const updatedOrders = data.orders.map((order) =>
      order.id === orderId ? { ...order, order_status: newStatus } : order
    );
    setData({ ...data, orders: updatedOrders });

    setStatusModal((prev) => ({
      ...prev,
      orderDetails: { ...prev.orderDetails, order_status: newStatus },
    }));

    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!result.success) {
        // Revert UI if API call fails
        const originalOrders = data.orders.map((order) =>
          order.id === orderId ? { ...order, order_status: statusModal.orderDetails.order_status } : order
        );
        setData({ ...data, orders: originalOrders });

        setStatusModal((prev) => ({
          ...prev,
          orderDetails: { ...prev.orderDetails, order_status: prev.orderDetails.order_status },
        }));

        toast.error("อัปเดตสถานะไม่สำเร็จ");
      } else {
        toast.success("อัปเดตสถานะสำเร็จ");
      }
    } catch (err) {
      console.error("Failed to update status:", err);

      // Revert UI in case of error
      const originalOrders = data.orders.map((order) =>
        order.id === orderId ? { ...order, order_status: statusModal.orderDetails.order_status } : order
      );
      setData({ ...data, orders: originalOrders });

      setStatusModal((prev) => ({
        ...prev,
        orderDetails: { ...prev.orderDetails, order_status: prev.orderDetails.order_status },
      }));

      toast.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  if (!data)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        <CircularProgress />
      </div>
    );

  const { orderDetails } = statusModal;

  return (
    <div style={{ padding: 30 }}>
      <ToastContainer />
      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "2px",
        }}
      >
         {[{
          title: "รายการวันนี้",
          value: data?.summary.total_orders_today || 0,
          color: "#4ee304",
          icon: <ShoppingCartRoundedIcon />,
        },{
          title: "รายการที่รอการตอบรับ",
          value: data?.summary.in_progress_count || 0,
          color: "#e3e304",
          icon: <HourglassBottomRoundedIcon />,
        },{
          title: "เซนเซอร์ที่ว่าง",
          value: data?.summary.status_free || 0,
          color: "#5c5c5d",
          icon: <SensorsRoundedIcon />,
        },{
          title: "เซนเซอร์ที่ใช้งาน",
          value: data?.summary.status_progress || 0,
          color: "#0495e3",
          icon: <SensorsOffRoundedIcon />,
        }].map((item) => (
          <Card key={item.title} sx={{ backgroundColor: item.color, padding: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 2, color: "white", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon}
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                {item.title}
              </Typography>
            </div>
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "right", color: "white" }}>
              {item.value}
            </Typography>
          </Card>
        ))}
      </div>
      {/* Orders Table */}
      <div style={{ marginTop: 30 }}>
        <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#38b000" }}> {/* กำหนดสีพื้นหลังของแถว Header */}
                {columns.map((col) => (
                  <TableCell
                    key={col.field || col.key}
                    sx={{
                      color: "white", // สีตัวอักษร
                      fontWeight: "700", // ตัวหนา
                      fontSize: "14px", // ขนาดตัวอักษร
                    }}
                  >
                    {col.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.orders.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((order, index) => (
                <TableRow
                  key={order.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f2f2f2" },
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9", // สลับสีพื้นหลัง
                  }}
                  onClick={() => handleRowClick(order)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.title}>{column.render ? column.render(order) : order[column.field]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(data.orders.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: 14,
              },
              marginLeft: 2,
            }}
          />
        </Box>
      </div>
      {/* Status Modal */}
      <Modal open={statusModal.visible} onClose={closeModal}>
  <Box sx={{ 
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    width: 500, // เพิ่มความกว้างของ Modal
    backgroundColor: "white", 
    borderRadius: 3, // ขอบโค้งมากขึ้น
    boxShadow: 24, 
    p: 4,
    outline: "none", // ลบเส้นขอบเมื่อ Modal ถูกโฟกัส
  }}>
    {/* ปุ่มปิด Modal */}
    <IconButton
      aria-label="close"
      onClick={closeModal}
      sx={{
        position: 'absolute',
        right: 16,
        top: 16,
        color: (theme) => theme.palette.grey[600],
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // เพิ่มเอฟเฟกต์เมื่อ hover
        },
      }}
    >
      <CloseRoundedIcon />
    </IconButton>

    {/* หัวข้อ Modal */}
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#38b000' }}>
      จัดการสถานะคำสั่งซื้อ
    </Typography>

    <Divider sx={{ mb: 3 }} />

    {/* ข้อมูลคำสั่งซื้อ */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>คำสั่งซื้อ ID:</strong> {orderDetails.id}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>ชื่อผู้สั่งซื้อ:</strong> {orderDetails.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>สถานะปัจจุบัน:</strong>{" "}
        <Chip 
          label={orderDetails.order_status} 
          sx={{ 
            backgroundColor: getStatusColor(orderDetails.order_status),
            color: "white",
            fontWeight: 600,
          }} 
        />
      </Typography>
    </Box>

    {/* ฟอร์มเลือกสถานะใหม่ */}
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel sx={{ fontWeight: 600 }}></InputLabel>
      <Select
        value={orderDetails.order_status}
        onChange={(e) => setStatusModal({ ...statusModal, orderDetails: { ...orderDetails, order_status: e.target.value } })}
        sx={{
          borderRadius: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#38b000', // สีขอบเมื่อไม่โฟกัส
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#38b000', // สีขอบเมื่อ hover
          },
        }}
      >
        {["In progress", "Completed", "Pending", "Canceled"].map((status) => (
          <MenuItem key={status} value={status} sx={{ fontWeight: 500 }}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* ปุ่มอัปเดตสถานะ */}
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
      <Button 
        variant="outlined" 
        onClick={closeModal}
        sx={{
          textTransform: "none",
          "&:hover": {
              backgroundColor: "rgba(144, 238, 144, 0.1)", 
              borderColor: "#38b000", 
              color: "#38b000", 
          },
      }}
      >
        ยกเลิก
      </Button>
      <Button 
        variant="contained" 
        onClick={() => handleStatusChange(orderDetails.order_status)}
        sx={{
          color: "#ffffff",
          backgroundColor: "#38b000",
          "&:hover": { backgroundColor: "#2c8c00" },
        }}
      >
        อัปเดตสถานะ
      </Button>
    </Box>
  </Box>
</Modal>
    </div>
  );
};

export default Home;
