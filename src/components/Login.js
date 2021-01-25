import React from "react";
import { Form, Input, Button } from "antd";
import { tailLayout } from "../utils/layouts";
const Login = () => {
  return (
    <>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Por favor coloque o nome" }]}
      >
        <Input style={{ width: "13em" }} />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: "Por favor coloque a senha" }]}
      >
        <Input.Password style={{ width: "13em" }} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          style={{ backgroundColor: "#8BC34A" }}
          shape="round"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </>
  );
};
export default Login
