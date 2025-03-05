import "./Register.css";
import { Button, Form, Grid, theme, Typography, message } from "antd";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { ThemeProvider } from "@mui/material/styles";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
const demoTheme = {
  typography: {
    fontFamily: "'Sarabun', sans-serif",
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500 },
  }
};

export default function SignUpPage() {
  const { token } = useToken();
  const screens = useBreakpoint();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            tel: values.phone,
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert2 success message with Sarabun font
        Swal.fire({
          title: 'สมัครสมาชิกสำเร็จ!',
          icon: 'success',
          confirmButtonText: 'เข้าสู่ระบบ',
          confirmButtonColor: '#32CD32',
          customClass: {
            popup: 'sarabun-font', // Apply Sarabun font to the popup
            title: 'sarabun-font', // Apply Sarabun font to the title
            content: 'sarabun-font', // Apply Sarabun font to the content
            confirmButton: 'sarabun-font', // Apply Sarabun font to the confirm button
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to login page
            window.location.href = "/";
          }
        });
      } else {
        const errorData = await response.json();
        message.error(errorData.error); // Show error message
      }
    } catch (error) {
      console.error("Registration failed:", error);
      message.error("Something went wrong. Please try again later.");
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      maxWidth: "380px",
      width: "100%",
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: screens.sm ? "100vh" : "auto",
      backgroundColor: token.colorBgContainer,
      padding: screens.md ? `${token.sizeXXL}px 0` : "0",
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    header: {
      textAlign: "center",
      marginBottom: token.marginXL,
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    text: {
      color: token.colorTextSecondary,
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    signupLink: {
      marginTop: token.marginLG,
      textAlign: "center",
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
    forgotPassword: {
      float: "right",
      fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
    },
  };

  return (
    <ThemeProvider theme={demoTheme}>
          <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;700&display=swap" rel="stylesheet" />
          <style>
            {`
              .sarabun-font {
                font-family: 'Sarabun', sans-serif !important;
              }
            `}
          </style>
    <section style={styles.section}>
      <div className="wrapper">
        <div style={styles.header}>
          <Title style={styles.title}>ลงทะเบียน</Title>
          <Text style={styles.text}>สร้างบัญชีเพื่อเริ่มต้น</Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <div className="form-group">
            <label htmlFor="username" className="username-label">
              ชื่อผู้ใช้
            </label>
            <Form.Item
              name="username"
              rules={[
                {
                  type: "username",
                  required: false,
                  message: "กรุณาใส่ชื่อผู้ใช้ของคุณ!",
                },
              ]}
            >
              <input
                type="username"
                id="username"
                className="username-Input"
                placeholder="ชื่อผู้ใช้"
                style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="email-label">
              อีเมล
            </label>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: false,
                  message: "กรุณาใส่อีเมลของคุณ!",
                },
              ]}
            >
              <input
                type="email"
                id="email"
                className="email-Input"
                placeholder="อีเมล"
                style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="phone-label">
              เบอร์โทรศัพท์
            </label>
            <Form.Item
              name="phone"
              rules={[
                {
                  type: "tel",
                  required: false,
                  message: "กรุณาใส่เบอร์โทรศัพท์ของคุณ!",
                },
              ]}
            >
              <input
                type="tel"
                id="phone"
                className="phone-input"
                placeholder="เบอร์โทรศัพท์"
                style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
              />
            </Form.Item>
          </div>
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
                      type: "text",
                      required: false,
                      message: "กรุณาใส่ชื่อของคุณ!",
                    },
                  ]}
                >
                  <input
                    type="text"
                    id="firstName"
                    className="firstName-input"
                    placeholder="ชื่อ"
                    style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastName" className="lastName-label">
                  นามสกุล
                </label>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      type: "text",
                      required: false,
                      message: "กรุณาใส่นามสกุลของคุณ!",
                    },
                  ]}
                >
                  <input
                    type="text"
                    id="lastName"
                    className="lastName-input"
                    placeholder="นามสกุล"
                    style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="password-label">
              รหัสผ่าน
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: false,
                  message: "กรุณาใส่รหัสผ่านของคุณ!",
                },
              ]}
            >
              <input
                type="password"
                id="password"
                className="password-Input"
                placeholder="รหัสผ่าน"
                style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <label
              htmlFor="confirm-password"
              className="confirm-password-label"
            >
              ยืนยันรหัสผ่าน
            </label>
            <Form.Item
              name="confirm-password"
              rules={[
                {
                  required: false,
                  message: "กรุณาใส่รหัสผ่านของคุณ!",
                },
              ]}
            >
              <input
                type="password"
                id="confirm-password"
                className="confirm-password-Input"
                placeholder="ยืนยันรหัสผ่าน"
                style={{ fontFamily: "'Sarabun', sans-serif" }} // Updated to Sarabun
              />
            </Form.Item>
          </div>
          <Form.Item style={{ marginBottom: "0" }}>
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                backgroundColor: "#32CD32",
                borderColor: "#32CD32",
                color: "#fff",
                fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
              }}
            >
              ลงทะเบียน
            </Button>
            <div style={styles.signupLink}>
              <Text style={styles.text}>มีบัญชีอยู่แล้วหรือ?</Text>{" "}
              <Link href="/" style={{
                color: "#32CD32", fontFamily: "'Sarabun', sans-serif", // Updated to Sarabun
              }}>
                เข้าสู่ระบบ
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
    </ThemeProvider>
  );
}