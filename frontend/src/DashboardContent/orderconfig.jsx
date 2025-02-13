import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Box,
    Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderTable = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/orderlist");
                if (response.status === 200) {
                    setOrders(response.data.orders);
                } else {
                    console.error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
                }
            } catch (error) {
                console.error(error);
                console.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
        { title: <span style={{ display: 'block', textAlign: 'left' }}>จำนวน(กิโลกรัม)</span>, field: "quantity" },
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

    return (
        <div style={{ marginTop: 10 }}>
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
            {loading ? (
                <CircularProgress style={{ display: "block", margin: "50px auto" }} />
            ) : (
                <TableContainer 
                component={Paper}
                sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3, // เพิ่มเงาให้ตาราง
                }}>
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
                                    }}
                                >
                                    {col.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover onClick={() => navigate(`/editorder/${order.id}`)}>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {column.render ? column.render(order) : order[column.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default OrderTable;