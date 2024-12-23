import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
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
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      minHeight: "100vh",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
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
            <Input prefix={<MailOutlined />} placeholder="ชื่อผู้ใช้หรืออีเมล" />
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
    </section>
  );
}
