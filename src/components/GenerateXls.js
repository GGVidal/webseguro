import React from "react";
import { DatePicker, Button, Form } from "antd";
import { tailLayout } from "../utils/layouts";
const GenerateXls = () => {
  return (
    <>
      <Form.Item
        label="Data de Inicio"
        name="minDate"
        style={{ marginTop: "2em" }}
        rules={[
          {
            required: true,
            message: "Por favor preencha a data de inicio",
          },
        ]}
      >
        <DatePicker placeholder="" format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        label="Data de fim"
        name="maxDate"
        rules={[
          {
            required: true,
            message: "Por favor preencha a data de fim",
          },
        ]}
      >
        <DatePicker placeholder="" format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item
        label="Data de inicio preenchimento"
        name="startDate"
        extra="Colocar a data de inicio do preenchimento do formulário"
        rules={[
          {
            required: true,
            message: "Por favor preencha a data de inicio de preenchimento",
          },
        ]}
      >
        <DatePicker placeholder="" format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          style={{ backgroundColor: "#8BC34A" }}
          shape="round"
          htmlType="submit"
        >
          Gerar
        </Button>
      </Form.Item>
    </>
  );
};

export default GenerateXls;
