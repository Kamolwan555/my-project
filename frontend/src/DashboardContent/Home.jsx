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
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../DashboardContent/css/index.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import SensorsOffRoundedIcon from "@mui/icons-material/SensorsOffRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';

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
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleStatusChange = async (newStatus) => {
    const accessToken = localStorage.getItem("accessToken");
    const orderId = statusModal.orderDetails.id;

    const updatedOrders = data.orders.map((order) =>
      order.id === orderId ? { ...order, order_status: newStatus } : order
    );
    setData({ ...data, orders: updatedOrders });

    // Update the status in the modal
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
        // Rollback if the request fails
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

      // Rollback if there's an error
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '600px' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#38b000' }}>
            รายละเอียดคำสั่งซื้อ
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                ออเดอร์ที่:
              </Typography>
              <Typography variant="body1">{orderDetails.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                ชื่อลูกค้า:
              </Typography>
              <Typography variant="body1">{orderDetails.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                ที่อยู่:
              </Typography>
              <Typography variant="body1">{orderDetails.address}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                พืช:
              </Typography>
              <Typography variant="body1">{orderDetails.plant}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                วันที่สั่งซื้อ:
              </Typography>
              <Typography variant="body1">
                {orderDetails.order_date
                  ? new Date(orderDetails.order_date).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                รหัสของพืช:
              </Typography>
              <Typography variant="body1">{orderDetails.plant_number}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                จำนวน:
              </Typography>
              <Typography variant="body1">{orderDetails.quantity}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                สถานะ:
              </Typography>
              <Chip
                label={orderDetails.order_status}
                sx={{
                  backgroundColor: getStatusColor(orderDetails.order_status),
                  color: 'white',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
            <Button
              onClick={() => handleStatusChange('Completed')}
              variant="contained"
              sx={{
                color: "#ffffff",
                backgroundColor: "#38b000",
                "&:hover": { backgroundColor: "#2c8c00" },
              }}
            >
              ยืนยัน
            </Button>
            <Button
              onClick={() => handleStatusChange('Canceled')}
              variant="contained"
              sx={{
                color: "#ffffff",
                backgroundColor: "#f80000",
                "&:hover": { backgroundColor: "#d60000" },
              }}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={() => handleStatusChange('Pending')}
              variant="contained"
              sx={{
                color: "#ffffff",
                backgroundColor: "#ffc300",
                "&:hover": { backgroundColor: "#e6b000" },
              }}
            >
              แก้ไข
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;