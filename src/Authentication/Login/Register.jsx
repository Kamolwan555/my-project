import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function SignUpPage() {
const { token } = useToken();
const screens = useBreakpoint();

const onFinish = (values) => {
console.log("Received values of form: ", values);
};

const styles = {
container: {
    margin: "0 auto",
    padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
    maxWidth: "380px",
    width: "100%",
},
section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: screens.sm ? "100vh" : "auto",
    backgroundColor: token.colorBgContainer,
    padding: screens.md ? `${token.sizeXXL}px 0` : "0",
},
header: {
    textAlign: "center",
    marginBottom: token.marginXL,
},
title: {
    fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
},
text: {
    color: token.colorTextSecondary,
},
signupLink: {
    marginTop: token.marginLG,
    textAlign: "center",
},
forgotPassword: {
    float: "right",
},
};

return (
<section style={styles.section}>
    <div style={styles.container}>
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
        <Form.Item
        name="Username"
        rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้ของคุณ!" }]}
        >
        <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" aria-label="Name" />
        </Form.Item>
        <Form.Item
        name="email"
        rules={[{ type: "email", required: true, message: "กรุณากรอกอีเมลของคุณ!" }]}
        >
        <Input prefix={<MailOutlined />} placeholder="อีเมล" aria-label="Email" />
        </Form.Item>
        <Form.Item
        name="password"
        extra="รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"
        rules={[{ required: true, message: "กรุณาใส่รหัสผ่านของคุณ!" }]}
        >
        <Input.Password
            prefix={<LockOutlined />}
            placeholder="รหัสผ่าน"
            aria-label="Password"
        />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0" }}>
        <Button block type="primary" htmlType="submit">
            ลงทะเบียน
        </Button>
        <div style={styles.signupLink}>
            <Text style={styles.text}>มีบัญชีอยู่แล้วหรือ?</Text>{" "}
            <Link href="/login">เข้าสู่ระบบ</Link>
        </div>
        </Form.Item>
    </Form>
    </div>
</section>
);
}
