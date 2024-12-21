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
        <Title style={styles.title}>Sign up</Title>
        <Text style={styles.text}>Join us! Create an account to get started.</Text>
    </div>
    <Form
        name="normal_signup"
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
    >
        <Form.Item
        name="Username"
        rules={[{ required: true, message: "Please input your Name!" }]}
        >
        <Input prefix={<UserOutlined />} placeholder="Name" aria-label="Name" />
        </Form.Item>
        <Form.Item
        name="email"
        rules={[{ type: "email", required: true, message: "Please input your Email!" }]}
        >
        <Input prefix={<MailOutlined />} placeholder="Email" aria-label="Email" />
        </Form.Item>
        <Form.Item
        name="password"
        extra="Password needs to be at least 8 characters."
        rules={[{ required: true, message: "Please input your Password!" }]}
        >
        <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            aria-label="Password"
        />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0" }}>
        <Button block type="primary" htmlType="submit">
            Sign up
        </Button>
        <div style={styles.signupLink}>
            <Text style={styles.text}>Already have an account?</Text>{" "}
            <Link href="/login">Register</Link>
        </div>
        </Form.Item>
    </Form>
    </div>
</section>
);
}
