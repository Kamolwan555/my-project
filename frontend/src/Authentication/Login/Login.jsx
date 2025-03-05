import { Button, Checkbox, Form, Grid, theme, Typography } from "antd";
import "./Login.css";
import picture from "../../components/extended/background/picture.jpg";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
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

export default function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const login = async (usernameOrEmail, password, callback) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email: usernameOrEmail,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("roleName", data.role_name);
        localStorage.setItem("user_id", data.user_id);
        callback();
      } else {
        throw new Error("No access token received");
      }
    } catch (err) { // eslint-disable-line no-unused-vars
  Swal.fire({
    icon: "error",
    title: "เกิดข้อผิดพลาด",
    text: "มีบางอย่างผิดพลาด กรุณาลองอีกครั้งในภายหลัง",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#32CD32",
    customClass: {
      popup: "sarabun-font",
      title: "sarabun-font",
      content: "sarabun-font",
      confirmButton: "sarabun-font",
    },
  });
}
  };
  

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    login(values.email, values.password, () => {
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ!',
        text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#32CD32',
        customClass: {
          popup: 'sarabun-font', // Apply Sarabun font to the popup
          title: 'sarabun-font', // Apply Sarabun font to the title
          content: 'sarabun-font', // Apply Sarabun font to the content
          confirmButton: 'sarabun-font', // Apply Sarabun font to the confirm button
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Home");
        }
      });
    });
  };

  const styles = {
    section: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    header: {
      marginBottom: token.marginLG,
      textAlign: "center",
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    text: {
      color: token.colorTextSecondary,
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
    },
    imageSection: {
      flex: 1,
      backgroundImage: `url(${picture})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: screens.md ? "block" : "none",
      fontFamily: "'Sarabun', sans-serif", // Apply Sarabun font
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
        <div style={styles.imageSection}></div>
        <div style={styles.container}>
          <div>
            <div style={styles.header}>
              <Title style={styles.title}>เข้าสู่ระบบ</Title>
              <Text style={styles.text}>
                กรุณากรอกรายละเอียดด้านล่างเพื่อเข้าสู่ระบบ
              </Text>
            </div>
            <Form
              name="normal_login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
            >
              <label htmlFor="email" className="email-label" style={{ marginBottom: "0px", fontFamily: "'Sarabun', sans-serif" }}>
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
                  placeholder="ชื่อผู้ใช้หรืออีเมล"
                  style={{ fontFamily: "'Sarabun', sans-serif" }}
                />
              </Form.Item>
              <label htmlFor="password" className="password-label" style={{ marginBottom: "0px", fontFamily: "'Sarabun', sans-serif" }}>
                รหัสผ่าน
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่รหัสผ่านของคุณ!",
                  },
                ]}
              >
                <input
                  type="password"
                  id="password"
                  className="password-input"
                  placeholder="รหัสผ่าน"
                  style={{ fontFamily: "'Sarabun', sans-serif" }}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ fontFamily: "'Sarabun', sans-serif" }}>
                    จดจำฉันไว้
                  </Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item style={{ marginTop: "auto" }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#32CD32",
                    borderColor: "#32CD32",
                    color: "#fff",
                    fontFamily: "'Sarabun', sans-serif",
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
                <div style={styles.footer}>
                  <Text style={styles.text}>ไม่มีบัญชีใช่ไหม?</Text>{" "}
                  <Link
                    href="/register"
                    style={{
                      color: "#32CD32",
                      fontFamily: "'Sarabun', sans-serif",
                    }}
                  >
                    ลงทะเบียน
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}