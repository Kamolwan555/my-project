import { useNavigate } from "react-router-dom";
import "../DashboardContent/css/index.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // นำเข้าไอคอนย้อนกลับ

const SimpleTable = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: '#',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'นามสกุล',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'เบอร์โทร',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    const data = [
        {
            key: '1',
            userid: '12345',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            tel: '123-456-7890',
            role: 'Admin',
        },
        {
            key: '2',
            userid: '67890',
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            tel: '987-654-3210',
            role: 'User',
        },
    ];

    return (
        <div style={{ marginTop: 10 }}> {/* ลด marginTop ของ div หลัก */}
            {/* ปุ่มย้อนกลับ */}
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

            {/* Table Section */}
            <TableContainer
                component={Paper}
                sx={{
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
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "white", fontFamily: "Sarabun, sans-serif" }}>
                        การตั้งค่าผู้ใช้
                    </Typography>
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
                                    }}
                                >
                                    {col.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={row.key}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    cursor: 'pointer',
                                    fontFamily: "Sarabun, sans-serif",
                                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // สลับสีแถว
                                }}
                                onClick={() => navigate(`/edituser/${row.userid}`)}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.key} sx={{ fontFamily: "Sarabun, sans-serif", whiteSpace: 'nowrap' }}>
                                        {row[column.dataIndex]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SimpleTable;