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
  Select,
  MenuItem,
  TextField,
  Pagination,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

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

const crops = [
  { id: "75", name: "ไม่ระบุพืช" },
  { id: "72", name: "กระเทียม หอมแดง และหอมหัวใหญ่" },
  { id: "9", name: "ข้าวนาปรัง/ข้าวไม่ไวแสง" },
  { id: "10", name: "ข้าวนาปี/ข้าวไวแสง" },
  { id: "70", name: "ข้าวโพดฝักสด (ข้าวโพดหวาน ข้าวโพดข้าวเหนียว และข้าวโพดฝักอ่อน)" },
  { id: "71", name: "ข้าวโพดเลี้ยงสัตว์" },
  { id: "65", name: "คะน้า ผักกาดหัว กะหล่ำปลี กะหล่ำดอก บรอกโคลี่ ผักกาดขาวปลี" },
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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

  const handleChange = (event) => {
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

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://127.0.0.1:5000/order`,
        { ...values, plant: selectedCrop },
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

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div style={{ marginTop: 30 }}>
      {/* Order Table */}
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3, // เพิ่มเงาให้ตาราง
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
                    borderBottom: "2px solid #38b000", // เพิ่มเส้นขอบด้านล่าง
                  }}
                >
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
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
        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </TableContainer>

      {/* Order Details Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ p: 4, bgcolor: "background.paper" }}>
          {selectedOrder ? (
            <div>
              <Typography variant="h6">Order Details</Typography>
              <p>
                <strong>ชื่อ:</strong> {selectedOrder.name}
              </p>
              <p>
                <strong>ที่อยู่:</strong> {selectedOrder.address}
              </p>
              <p>
                <strong>พืช:</strong> {selectedOrder.plant}
              </p>
              <p>
                <strong>เบอร์โทร:</strong> {selectedOrder.plant_number}
              </p>
              <p>
                <strong>จำนวน:</strong> {selectedOrder.quantity}
              </p>
              <p>
                <strong>วันที่:</strong>{" "}
                {new Date(selectedOrder.order_date).toLocaleDateString()}
              </p>
              <p>
                <strong>สถานะ:</strong> {selectedOrder.order_status}
              </p>
            </div>
          ) : (
            <Typography>No order selected</Typography>
          )}
          <Button onClick={() => setIsModalOpen(false)}>ปิด</Button>
        </Box>
      </Modal>

      {/* Add Order Modal */}
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
          <Typography variant="h6" sx={{ mb: 3 }}>
            เพิ่มคำสั่งซื้อใหม่
          </Typography>
          <form
            onSubmit={handleAddOrderSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <TextField
              name="name"
              label="ชื่อผู้ซื้อ"
              variant="outlined"
              required
              placeholder="ชื่อผู้ซื้อ"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="address"
              label="ที่อยู่"
              variant="outlined"
              required
              placeholder="ที่อยู่"
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="phone"
              label="เบอร์โทรศัพท์"
              variant="outlined"
              required
              placeholder="เบอร์โทรศัพท์"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="quantity"
              label="จำนวน"
              variant="outlined"
              required
              placeholder="จำนวน"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
              <InputLabel>เลือกพืช</InputLabel>
              <Select
                name="plant"
                value={selectedCrop}
                onChange={handleChange}
                required
                label="เลือกพืช"
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
  );
};

export default Order;