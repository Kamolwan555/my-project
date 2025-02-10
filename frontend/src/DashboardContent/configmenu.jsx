import { Grid, Typography, Button, Paper } from "@mui/material";
import { PersonOutline, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ModernMenu = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: "การตั้งค่าผู้ใช้",
            description: "จัดการข้อมูลผู้ใช้ในระบบ",
            icon: <PersonOutline style={{ fontSize: 48, color: "#1976d2" }} />,
            link: "/userconfig",
        },
        {
            title: "การตั้งค่าคำสั่งซื้อ",
            description: "จัดการข้อมูลคำสั่งซื้อในระบบ",
            icon: <ShoppingCart style={{ fontSize: 48, color: "#4caf50" }} />,
            link: "/orderconfig",
        },
    ];

    return (
        <div
            style={{
                padding: "20px",
                minHeight: "100vh",
                fontFamily: "'Sarabun', sans-serif",
            }}
        >
            <Grid container spacing={3} justifyContent="center">
                {menuItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            style={{
                                borderRadius: "8px",
                                padding: "20px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                                fontFamily: "'Sarabun', sans-serif",
                            }}
                            onClick={() => navigate(item.link)}
                        >
                            <div style={{ marginBottom: "16px" }}>{item.icon}</div>
                            <Typography
                                variant="h5"
                                gutterBottom
                                style={{ fontFamily: "'Sarabun', sans-serif" }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                style={{ fontFamily: "'Sarabun', sans-serif" }}
                            >
                                {item.description}
                            </Typography>
                            <div style={{ marginTop: "16px" }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        fontFamily: "'Sarabun', sans-serif",
                                        backgroundColor: "white",
                                        color: "#000000",
                                        "&:hover": {
                                            backgroundColor: "#e9ecef", 
                                        },
                                    }}
                                >
                                    เข้าสู่เมนู
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ModernMenu;
