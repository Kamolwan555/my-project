import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import picture from "../../components/extended/background/picture.png";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const login = (usernameOrEmail, password, callback) => {
    fetch(`${import.meta.env.VITE_APP_API_HOST}/login`, {
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
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    text: {
      color: token.colorTextSecondary,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    imageSection: {
      flex: 1,
      backgroundImage: `url(${picture})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: screens.md ? "block" : "none",
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
              <Input
                prefix={<MailOutlined />}
                placeholder="ชื่อผู้ใช้หรืออีเมล"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณาใส่รหัสผ่านของคุณ!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="รหัสผ่าน"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>จดจำฉันไว้</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit">
                เข้าสู่ระบบ
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>ไม่มีบัญชีใช่ไหม?</Text>{" "}
                <Link href="/register">ลงทะเบียน</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );  
}
