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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditUser = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        first_name: "",
        last_name: "",
        address: "",
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
                setUserData(data);
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
                <CircularProgress color="success" />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" textAlign="center" mt={4}>
                Error: {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
            {/* Header Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
                    sx={{
                        color: "#38b000",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(56, 176, 0, 0.1)" },
                    }}
                >
                    ย้อนกลับ
                </Button>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 700, color: "#38b000" }}>
                    แก้ไขผู้ใช้
                </Typography>
            </Box>

            {/* Edit Form */}
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="ชื่อผู้ใช้"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            label="ชื่อ"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="นามสกุล"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                    </Box>

                    <TextField
                        label="ที่อยู่"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        fullWidth
                    />

                    <TextField
                        label="เบอร์โทร"
                        name="tel"
                        value={userData.tel}
                        onChange={handleInputChange}
                        inputProps={{ pattern: "[0-9]{10}" }}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={userData.role}
                            label="Role"
                            onChange={handleInputChange}
                            required
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    {submitError && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {submitError}
                        </Typography>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outlined"
                            sx={{
                                color: "#38b000",
                                borderColor: "#38b000",
                                "&:hover": { borderColor: "#2d8500" },
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: "#38b000",
                                "&:hover": { bgcolor: "#2d8500" },
                            }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "บันทึกการเปลี่ยนแปลง"
                            )}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default EditUser;