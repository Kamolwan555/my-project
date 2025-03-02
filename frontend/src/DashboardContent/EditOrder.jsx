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

const EditOrder = () => {
    const { orderid } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        name: "",
        address: "",
        order_date: "",
        order_status: "Pending",
        plant: "",
        plant_number: "",
        quantity: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/order/5`);
                if (!response.ok) throw new Error("Failed to fetch order data");
                const data = await response.json();
                const order = data.order;
                setOrderData({
                    name: order.name,
                    address: order.address,
                    order_date: order.order_date,
                    order_status: order.order_status,
                    plant: order.plant,
                    plant_number: order.plant_number,
                    quantity: order.quantity,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(`http://127.0.0.1:5000/order/${orderid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update order");
            }

            navigate("/orderconfig");
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/orderconfig");
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
                    onClick={() => navigate("/orderconfig")}
                >
                    กลับไปยังหน้าออเดอร์
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
                        แก้ไขออเดอร์
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="ชื่อผู้สั่ง"
                                name="name"
                                value={orderData.name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="ที่อยู่"
                                name="address"
                                value={orderData.address}
                                onChange={handleInputChange}
                                required
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>สถานะการออเดอร์</InputLabel>
                                <Select
                                    name="order_status"
                                    value={orderData.order_status}
                                    label="สถานะการออเดอร์"
                                    onChange={handleInputChange}
                                    required
                                    sx={{ backgroundColor: "background.paper" }}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="หมายเลขโรงงาน"
                                name="plant"
                                value={orderData.plant}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="หมายเลขโทรศัพท์โรงงาน"
                                name="plant_number"
                                value={orderData.plant_number}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="จำนวน"
                                name="quantity"
                                value={orderData.quantity}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                type="number"
                                variant="outlined"
                                sx={{ backgroundColor: "background.paper" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                วันที่ออเดอร์: {orderData.order_date}
                            </Typography>
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

export default EditOrder;