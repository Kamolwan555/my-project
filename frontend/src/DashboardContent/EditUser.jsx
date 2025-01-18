import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../DashboardContent/css/index.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Select, Form } from "antd";

const { Option } = Select;

const theme = createTheme({
    typography: {
        fontFamily: "Noto Sans Thai, serif",
    },
});

function EditUser() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/userconfig");
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {/* Header Container */}
                <div className="header-container">
                    <IconButton className="icon-button" onClick={handleBackClick}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h3 className="user-form">แก้ไขข้อมูลส่วนตัว</h3>
                </div>

                {/* Form Container */}
                <div className="form-container">
                    <div className="form-header">
                        <p className="form-description">ข้อมูลส่วนตัวผู้ใช้</p>
                    </div>

                    <div className="form-body">
                        <form className="form-field">
                            {/* User ID */}
                            <div className="form-group">
                                <label htmlFor="userid" className="email-label">
                                    User ID
                                </label>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณาใส่ User ID ของคุณ!",
                                        },
                                    ]}
                                >
                                    <input
                                        type="text"
                                        id="userid"
                                        className="email-input"
                                        placeholder="User ID"
                                    />
                                </Form.Item>
                            </div>

                            {/* First Name */}
                            <div className="form-grid">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName" className="firstName-label">
                                            ชื่อ
                                        </label>
                                        <Form.Item
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาใส่ชื่อของคุณ!",
                                                },
                                            ]}
                                        >
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="firstName-input"
                                                placeholder="ชื่อ"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                {/* Last Name */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="lastName" className="lastName-label">
                                            นามสกุล
                                        </label>
                                        <Form.Item
                                            name="lastName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาใส่นามสกุลของคุณ!",
                                                },
                                            ]}
                                        >
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="lastName-input"
                                                placeholder="นามสกุล"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email" className="email-label">
                                    อีเมล
                                </label>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: "email",
                                            required: true,
                                            message: "กรุณาใส่อีเมลของคุณ!",
                                        },
                                    ]}
                                >
                                    <input
                                        type="email"
                                        id="email"
                                        className="email-input"
                                        placeholder="อีเมล"
                                    />
                                </Form.Item>
                            </div>

                            {/* Phone Number */}
                            <div className="form-group">
                                <label htmlFor="phone" className="phone-label">
                                    เบอร์โทรศัพท์
                                </label>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณาใส่เบอร์โทรศัพท์ของคุณ!",
                                        },
                                    ]}
                                >
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="phone-input"
                                        placeholder="เบอร์โทรศัพท์"
                                    />
                                </Form.Item>
                            </div>

                            {/* Role */}
                            <div className="form-group">
                                <label htmlFor="role" className="role-label">
                                    Role
                                </label>
                                <Form.Item
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a role!",
                                        },
                                    ]}
                                >
                                    <Select
                                        id="role"
                                        className="role-select"
                                        placeholder="Select role"
                                        allowClear
                                    >
                                        <Option value="admin">Admin</Option>
                                        <Option value="user">User</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button type="submit" className="submit-button">
                                    บันทึก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default EditUser;
