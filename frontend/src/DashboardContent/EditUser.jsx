import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
    Typography,
    Container,
    Grid,
} from "@mui/material";
import { useState } from "react";

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

function EditUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userid: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
    });

    const handleBackClick = () => {
        navigate("/userconfig");
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation here
        if (!formData.userid || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.role) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        // Handle form submission (e.g., send data to an API)
        console.log("Form Data Submitted:", formData);

        // Navigate back or show success message
        navigate("/userconfig");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                {/* Header Container */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackClick}
                    sx={{
                        color: "#38b000",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "rgba(56, 176, 0, 0.1)",
                        },
                    }}
                >
                    ย้อนกลับ
                </Button>

                {/* Form Container */}
                <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" component="p">
                            แก้ไขข้อมูลส่วนตัวผู้ใช้
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        {/* User ID */}
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                id="userid"
                                label="User ID"
                                variant="outlined"
                                required
                                value={formData.userid}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* First Name and Last Name */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    label="ชื่อ"
                                    variant="outlined"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="นามสกุล"
                                    variant="outlined"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        {/* Email */}
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                id="email"
                                label="อีเมล"
                                variant="outlined"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* Phone Number */}
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="เบอร์โทรศัพท์"
                                variant="outlined"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* Role */}
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    label="Role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Submit Button */}
                        <Box>
                            <Button type="submit" variant="contained" sx={{
                                color: "#ffffff",
                                backgroundColor: "#38b000",
                                "&:hover": { backgroundColor: "#2c8c00" },
                            }}>
                                บันทึก
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default EditUser;