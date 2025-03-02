import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Container,
    Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditUser = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        tel: "",
        role: "user",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${userid}`);
                if (!response.ok) throw new Error("Failed to fetch user data");
                const data = await response.json();
                const user = data.user;
                setUserData({
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    tel: user.tel,
                    role: user.role === 1 ? "user" : "admin",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(`http://localhost:5000/user/${userid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update user");
            }

            navigate("/userconfig");
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/userconfig");
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    Error: {error}
                </Alert>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/userconfig")}
                >
                    กลับไปยังหน้าผู้ใช้
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" >
            {/* Header Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 0 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
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
            </Box>

            {/* Edit Form */}
            <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" component="p">
                            แก้ไขข้อมูลส่วนตัวผู้ใช้
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="ชื่อผู้ใช้"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{
                                    backgroundColor: "background.paper",
                                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main"
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="ชื่อ"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{
                                    backgroundColor: "background.paper",
                                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="นามสกุล"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{
                                    backgroundColor: "background.paper",
                                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="เบอร์โทร"
                                name="tel"
                                value={userData.tel}
                                onChange={handleInputChange}
                                inputProps={{ pattern: "[0-9]{10}" }}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    backgroundColor: "background.paper",
                                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={userData.role}
                                    label="Role"
                                    onChange={handleInputChange}
                                    required
                                    sx={{
                                        backgroundColor: "background.paper",
                                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "primary.main",
                                        },
                                    }}
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {submitError && (
                            <Grid item xs={12}>
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {submitError}
                                </Alert>
                            </Grid>
                        )}

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <Button
                                type="button"
                                onClick={handleCancel}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "rgba(144, 238, 144, 0.1)", // สีพื้นหลังเมื่อ hover (เขียวอ่อน)
                                        borderColor: "#38b000", // สีขอบเมื่อ hover (เขียวอ่อน)
                                        color: "#38b000", // สีตัวอักษรเมื่อ hover (เขียวอ่อน)
                                    },
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{
                                    color: "#ffffff",
                                    backgroundColor: "#38b000",
                                    "&:hover": { backgroundColor: "#2c8c00" },
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "บันทึกการเปลี่ยนแปลง"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default EditUser;