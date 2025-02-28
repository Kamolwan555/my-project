import "../DashboardContent/css/index.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Button,
  Chip,
  Box,
  MenuItem,
  FormControl,
  IconButton,
  TextField,
  Select,
  InputLabel,
  Pagination,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38b000",
    },
  },
  typography: {
    fontFamily: "Sarabun, sans-serif",
  },
});

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
  { title: "เบอร์โทร", field: "plant_number" },
  { title: "จำนวน(กิโลกรัม)", field: "quantity", align: "left" },
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

const crops = [
  { id: "75", name: "ไม่ระบุพืช" },
  { id: "72", name: "กระเทียม หอมแดง และหอมหัวใหญ่" },
  { id: "9", name: "ข้าวนาปรัง/ข้าวไม่ไวแสง" },
  { id: "10", name: "ข้าวนาปี/ข้าวไวแสง" },
  {
    id: "70",
    name: "ข้าวโพดฝักสด (ข้าวโพดหวาน ข้าวโพดข้าวเหนียว และข้าวโพดฝักอ่อน)",
  },
  { id: "71", name: "ข้าวโพดเลี้ยงสัตว์" },
  {
    id: "65",
    name: "คะน้า ผักกาดหัว กะหล่ำปลี กะหล่ำดอก บรอกโคลี่ ผักกาดขาวปลี",
  },
  { id: "52", name: "เงาะ" },
  { id: "17", name: "ทุเรียน" },
  { id: "19", name: "ปาล์มน้ำมัน" },
  { id: "22", name: "พริก มะเขือ มะเขือเทศ กระเจี๊ยบเขียว" },
  { id: "13", name: "พืชตระกูลถั่ว (ใช้ปุ๋ยชีวภาพไรโซเบียม)" },
  { id: "12", name: "พืชตระกูลถั่ว (ไม่ใช้ปุ๋ยชีวภาพไรโซเบียม)" },
  { id: "63", name: "มะพร้าว" },
  { id: "26", name: "มะม่วง" },
  { id: "54", name: "มังคุด" },
  { id: "64", name: "มันฝรั่ง มันเทศ เผือก" },
  { id: "27", name: "มันสำปะหลัง" },
  { id: "38", name: "ยางพารา" },
  { id: "57", name: "ลำไย" },
  { id: "58", name: "ลิ้่นจี่" },
  { id: "77", name: "ส้ม" },
  { id: "36", name: "สับปะรด" },
  { id: "62", name: "หน่อไม้ฝรั่ง" },
  { id: "68", name: "อ้อยตอ" },
  { id: "69", name: "อ้อยปลูก" },
];

const Order = () => {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.error("กรุณาล็อกอินก่อน");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5000/orderlist`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const handleRowClick = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const handleAddOrderSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    if (!selectedCrop) {
      toast.error("กรุณาเลือกพืช");
      return;
    }

    const payload = { ...values, plant: selectedCrop };
    console.log("Payload:", payload);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://127.0.0.1:5000/order`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      toast.success(response.data.message || "Order added successfully!");
      setAddOrderModalOpen(false);

      const updatedOrders = await axios.get(`http://127.0.0.1:5000/orderlist`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(updatedOrders.data.orders || []);
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order. Please try again.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleStatusChange = async (status) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://127.0.0.1:5000/order/${selectedOrder.id}`,
        { order_status: status },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      toast.success(response.data.message || "Order status updated successfully!");
      setIsModalOpen(false);

      const updatedOrders = await axios.get(`http://127.0.0.1:5000/orderlist`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(updatedOrders.data.orders || []);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: 30 }}>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 2,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#38b000",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AssignmentRoundedIcon sx={{ color: "white" }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                คำสั่งซื้อ
              </Typography>
            </div>
            <Button
              variant="contained"
              onClick={() => setAddOrderModalOpen(true)}
              sx={{
                backgroundColor: "white",
                color: "#38b000",
                "&:hover": {
                  backgroundColor: "#e9ecef",
                },
              }}
            >
              เพิ่มคำสั่งซื้อ
            </Button>
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
                      borderBottom: "2px solid #38b000",
                      textAlign: col.align || "left",
                    }}
                  >
                    {col.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
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
                          textAlign: col.align || "left",
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
            count={Math.ceil(data.length / itemsPerPage)}
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

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
              onClick={() => setIsModalOpen(false)}
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
                <Typography variant="body1">{selectedOrder?.id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  ชื่อลูกค้า:
                </Typography>
                <Typography variant="body1">{selectedOrder?.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  ที่อยู่:
                </Typography>
                <Typography variant="body1">{selectedOrder?.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  พืช:
                </Typography>
                <Typography variant="body1">{selectedOrder?.plant}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  วันที่สั่งซื้อ:
                </Typography>
                <Typography variant="body1">
                  {selectedOrder?.order_date
                    ? new Date(selectedOrder.order_date).toLocaleDateString()
                    : 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  รหัสของพืช:
                </Typography>
                <Typography variant="body1">{selectedOrder?.plant_number}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  จำนวน:
                </Typography>
                <Typography variant="body1">{selectedOrder?.quantity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '120px' }}>
                  สถานะ:
                </Typography>
                <Chip
                  label={selectedOrder?.order_status}
                  sx={{
                    backgroundColor: getStatusColor(selectedOrder?.order_status),
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

        <Modal
          open={addOrderModalOpen}
          onClose={() => setAddOrderModalOpen(false)}
        >
          <Box
            sx={{
              p: 4,
              bgcolor: "background.paper",
              width: 500,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setAddOrderModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

            <Typography variant="h6" sx={{ mb: 3 }}>
              เพิ่มคำสั่งซื้อใหม่
            </Typography>
            <form
              onSubmit={handleAddOrderSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="ชื่อผู้ซื้อ"
                  variant="outlined"
                  placeholder="ชื่อผู้ซื้อ"
                  autoFocus
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="ที่อยู่"
                  variant="outlined"
                  placeholder="ที่อยู่"
                  multiline
                  rows={3}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="เบอร์โทรศัพท์"
                  variant="outlined"
                  placeholder="เบอร์โทรศัพท์"
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="จำนวน"
                  variant="outlined"
                  placeholder="จำนวน"
                  type="number"
                  required
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel>เลือกพืช</InputLabel>
                <Select
                  name="plant"
                  value={selectedCrop}
                  onChange={handleCropChange}
                  required
                  label="เลือกพืช"
                  variant="outlined"
                >
                  <MenuItem value="" disabled>
                    เลือกพืช
                  </MenuItem>
                  {crops.map((crop) => (
                    <MenuItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  onClick={() => setAddOrderModalOpen(false)}
                  color="error"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 0.08)",
                      color: "#d32f2f",
                    },
                  }}
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#38b000",
                    "&:hover": { backgroundColor: "#2c8c00" },
                  }}
                  startIcon={<SaveRoundedIcon />}
                >
                  ยืนยัน
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
};

export default Order;