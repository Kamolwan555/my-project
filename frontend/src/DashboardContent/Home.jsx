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
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../DashboardContent/css/index.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import SensorsOffRoundedIcon from "@mui/icons-material/SensorsOffRounded";

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
  const [page, setPage] = useState(1); // เพิ่ม state สำหรับหน้าปัจจุบัน
  const [itemsPerPage, setItemsPerPage] = useState(10); // เพิ่ม state สำหรับจำนวนรายการต่อหน้า

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
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err);
          toast.error("Failed to fetch data. Please try again later.");
        });
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

  // ฟังก์ชันจัดการการเปลี่ยนหน้า
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // ฟังก์ชันจัดการการเปลี่ยนจำนวนรายการต่อหน้า
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1); // รีเซ็ตไปที่หน้าแรกเมื่อเปลี่ยนจำนวนรายการต่อหน้า
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "2px",
        }}
      >
        {[
          {
            title: "รายการวันนี้",
            value: data?.summary.total_orders_today || 0,
            color: "#1e96fc",
            icon: <ShoppingCartRoundedIcon />,
          },
          {
            title: "รายการที่รอการตอบรับ",
            value: data?.summary.in_progress_count || 0,
            color: "#38b000",
            icon: <HourglassBottomRoundedIcon />,
          },
          {
            title: "เซนเซอร์ที่ว่าง",
            value: data?.summary.status_free || 0,
            color: "#ff8800",
            icon: <SensorsRoundedIcon />,
          },
          {
            title: "เซนเซอร์ที่ใช้งาน",
            value: data?.summary.status_progress || 0,
            color: "#f25c54",
            icon: <SensorsOffRoundedIcon />,
          },
        ].map((item) => (
          <Card
            key={item.title}
            sx={{
              backgroundColor: item.color,
              padding: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              color: "white",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon}
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                {item.title}
              </Typography>
            </div>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, textAlign: "right", color: "white" }}
            >
              {item.value}
            </Typography>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 30 }}>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 2,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#38b000",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AssignmentRoundedIcon sx={{ color: "white" }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                คำสั่งซื้อ
              </Typography>
            </div>
          </Box>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1ffe5" }}>
                {columns.map((col) => (
                  <TableCell
                    key={col.field || col.key}
                    sx={{
                      color: "#38b000",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    {col.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.orders
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.field || col.key}
                        sx={{
                          borderBottom: "1px solid #e0e0e0",
                          color: "#333",
                        }}
                      >
                        {col.render ? col.render(row) : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination และ Items per page ที่ด้านล่างขวา */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel sx={{ fontSize: 14 }}>Items</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items"
              sx={{ fontSize: 14, height: 30 }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>

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
      <Modal open={statusModal.visible} onClose={closeModal}>
        <Paper sx={{ padding: 3, margin: "auto", maxWidth: 500 }}>
          <Typography variant="h6">Order ID: {orderDetails.id}</Typography>
          <Typography>
            <strong>Customer Name:</strong> {orderDetails.name}
          </Typography>
          <Typography>
            <strong>Address:</strong> {orderDetails.address}
          </Typography>
          <Typography>
            <strong>Plant:</strong> {orderDetails.plant}
          </Typography>
          <Typography>
            <strong>Order Date:</strong>{" "}
            {orderDetails.order_date
              ? new Date(orderDetails.order_date).toLocaleDateString()
              : "N/A"}
          </Typography>
          <Typography>
            <strong>Plant Number:</strong> {orderDetails.plant_number}
          </Typography>
          <Typography>
            <strong>Quantity:</strong> {orderDetails.quantity}
          </Typography>
          <Typography>
            <strong>Status:</strong> {orderDetails.order_status}
          </Typography>
          <Button onClick={closeModal} sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default Home;