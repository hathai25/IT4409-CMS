import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Col, notification} from 'antd';
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../services/auth.service.js";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const result = await loginUser(values).then((res) => res);
      if (result?.status === 201) {
        localStorage.setItem("admin_token", result?.data?.access_token)
        notification.success({
          message: 'Success',
          description: 'Login successfully!',
        });
        navigate("/products");
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Login failed, try again!',
      });
    }
  };

  return (
    <div className="login-container">
      <Col className="login-container-card" xs={24} md={12} lg={6}>
        <h2 style={{textAlign: "center"}}>Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{required: true, message: 'Please type your username!'}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="Username"
              className="login-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: 'Please type your password!'}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="Password"
              className="login-input"
            />
          </Form.Item>
          <div className={"login-forgot-password"}>
            <Button type="primary" htmlType="submit" className="login-form-button"
                    style={{width: "100%", margin: "auto"}}>
              Log in
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  )
}

export default Login
