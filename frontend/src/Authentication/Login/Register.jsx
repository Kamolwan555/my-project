import "./Register.css";
import { Button, Form, Grid, theme, Typography, message } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

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
        const data = await response.json();
        message.success(data.message); // Show success message
        // Redirect to login page
        window.location.href = "/";
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
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: screens.sm ? "100vh" : "auto",
      backgroundColor: token.colorBgContainer,
      padding: screens.md ? `${token.sizeXXL}px 0` : "0",
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: token.marginXL,
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    text: {
      color: token.colorTextSecondary,
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    signupLink: {
      marginTop: token.marginLG,
      textAlign: "center",
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    forgotPassword: {
      float: "right",
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
  };

  return (
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
                  required: true,
                  message: "กรุณาใส่ชื่อผู้ใช้ของคุณ!",
                },
              ]}
            >
              <input
                type="username"
                id="username"
                className="username-Input"
                placeholder="ชื่อผู้ใช้"
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
                  required: true,
                  message: "กรุณาใส่อีเมลของคุณ!",
                },
              ]}
            >
              <input
                type="email"
                id="email"
                className="email-Input"
                placeholder="อีเมล"
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
          <div className="form-group">
            <label htmlFor="password" className="password-label">
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
                className="password-Input"
                placeholder="รหัสผ่าน"
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
                  required: true,
                  message: "กรุณาใส่รหัสผ่านของคุณ!",
                },
              ]}
            >
              <input
                type="confirm-password"
                id="confirm-password"
                className="confirm-password-Input"
                placeholder="ยืนยันรหัสผ่าน"
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
                fontFamily: "'Noto Sans Thai', sans-serif",
              }}
            >
              ลงทะเบียน
            </Button>
            <div style={styles.signupLink}>
              <Text style={styles.text}>มีบัญชีอยู่แล้วหรือ?</Text>{" "}
              <Link href="/" style={{
                color: "#32CD32", fontFamily: "'Noto Sans Thai', sans-serif",
              }}>
                เข้าสู่ระบบ
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
