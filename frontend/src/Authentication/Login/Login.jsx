import { Button, Checkbox, Form, Grid, theme, Typography } from "antd";
import "./Login.css";
import picture from "../../components/extended/background/picture.jpg";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const login = (usernameOrEmail, password, callback) => {
    fetch(`http://127.0.0.1:5000/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username_or_email: usernameOrEmail,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("roleName", res.role_name); // Storing role_name
          callback();
        }
      })
      .catch(() => {
        alert("something went wrong");
      });
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    login(values.email, values.password, () => {
      navigate("/Home");
    });
  };

  const styles = {
    section: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Noto Sans Thai', sans-serif",
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
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    header: {
      marginBottom: token.marginLG,
      textAlign: "center",
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
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
    imageSection: {
      flex: 1,
      backgroundImage: `url(${picture})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: screens.md ? "block" : "none",
      fontFamily: "'Noto Sans Thai', sans-serif",
    },
  };

  return (
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
            <label htmlFor="email" className="email-label" style={{ marginBottom: "0px" }}>
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
                style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}
              />
            </Form.Item>
            <label htmlFor="password" className="password-label" style={{ marginBottom: "0px" }}>
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
                style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}
                >
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
                  fontFamily: "'Noto Sans Thai', sans-serif",
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
                    fontFamily: "'Noto Sans Thai', sans-serif",
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
  );
}
