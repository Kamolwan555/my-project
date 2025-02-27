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
                    แก้ไขออเดอร์
                </Typography>
            </Box>

            {/* Edit Form */}
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="ชื่อผู้สั่ง"
                        name="name"
                        value={orderData.name}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="ที่อยู่"
                        name="address"
                        value={orderData.address}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={3}
                        fullWidth
                    />


                    <FormControl fullWidth>
                        <InputLabel>สถานะการออเดอร์</InputLabel>
                        <Select
                            name="order_status"
                            value={orderData.order_status}
                            label="สถานะการออเดอร์"
                            onChange={handleInputChange}
                            required
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="หมายเลขโรงงาน"
                        name="plant"
                        value={orderData.plant}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="หมายเลขโทรศัพท์โรงงาน"
                        name="plant_number"
                        value={orderData.plant_number}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="จำนวน"
                        name="quantity"
                        value={orderData.quantity}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        type="number"
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                         {orderData.order_date}
                      </Typography>

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

export default EditOrder;
