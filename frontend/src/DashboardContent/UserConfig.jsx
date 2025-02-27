import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress,
    TablePagination,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/user");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result.ussr); // เซ็ตข้อมูลจาก API
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBackClick = () => {
        navigate("/configmenu");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { title: "#", dataIndex: "id", key: "id" },
        { title: "ชื่อผู้ใช้", dataIndex: "name", key: "name" },
        { title: "ชื่อ", dataIndex: "first_name", key: "first_name" },
        { title: "นามสกุล", dataIndex: "last_name", key: "last_name" },
        { title: "ที่อยู่", dataIndex: "address", key: "address" },
        { title: "เบอร์โทร", dataIndex: "tel", key: "tel" },
        { title: "Role", dataIndex: "role", key: "role" },
    ];

    return (
        <div style={{ marginTop: 10 }}>
            {/* ปุ่มย้อนกลับ */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2, marginTop: 1 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackClick}
                    sx={{
                        color: "#38b000",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(56, 176, 0, 0.1)" },
                    }}
                >
                    ย้อนกลับ
                </Button>
            </Box>

            {/* โหลดข้อมูล */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                    <CircularProgress color="success" />
                </Box>
            ) : error ? (
                <Typography color="error" textAlign="center">
                    เกิดข้อผิดพลาด: {error}
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                    {/* หัวข้อตาราง */}
                    <Box sx={{ padding: 2, backgroundColor: "#38b000", borderBottom: "1px solid #e0e0e0" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "white", fontFamily: "Sarabun, sans-serif" }}>
                            การตั้งค่าผู้ใช้
                        </Typography>
                    </Box>

                    {/* ตารางข้อมูล */}
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f1ffe5" }}>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.key}
                                        sx={{
                                            color: "#38b000",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            borderBottom: "2px solid #38b000",
                                            fontFamily: "Sarabun, sans-serif",
                                        }}
                                    >
                                        {col.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        cursor: "pointer",
                                        fontFamily: "Sarabun, sans-serif",
                                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                        "&:hover": { backgroundColor: "rgba(56, 176, 0, 0.05)" },
                                    }}
                                    onClick={() => navigate(`/edituser/${row.id}`)}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            sx={{ fontFamily: "Sarabun, sans-serif", whiteSpace: "nowrap" }}
                                        >
                                            {row[column.dataIndex]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ borderTop: "1px solid #e0e0e0" }}
                    />
                </TableContainer>
            )}
        </div>
    );
};

export default UserTable;