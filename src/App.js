import React, { useState } from "react";
import "antd/dist/antd.css";
import { saveAs } from "file-saver";
import axios from "axios";
import { DatePicker, Layout, Button, Form, Typography, Row } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 16 },
  };
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [startDate, setStartDate] = useState(0);

  const tailLayout = {
    wrapperCol: { offset: 11, span: 16 },
  };

  const onFinish = (values) => {
    onRequest().then()
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onRequest = async () => {
    axios({
      url: "http://3.136.86.4:8080/pdf/seguro.xls",
      method: "POST",
      responseType: "blob",
      data: { min_date: minDate, max_date: maxDate, start_date: startDate }, // important
    }).then((response) => {
      saveAs(response.data, "seguro.xls");
    });
  };

  return (
    <Layout>
      <Header
        style={{
          zIndex: 1,
          width: "100%",
          backgroundColor: "#388E3C",
        }}
      >
        <div className="logo" />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: "2em" }}
      >
        <div className="site-layout-background" style={{ minHeight: "42em" }}>
          <Row align="center">
            <Title>Seguro Ítaca</Title>
          </Row>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Data de Inicio"
              name="dataInicio"
              style={{ marginTop: "2em" }}
              rules={[
                {
                  required: true,
                  message: "Por favor preencha a data de inicio",
                },
              ]}
            >
              <DatePicker
                placeholder=""
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  setMinDate(dateString);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Data de fim"
              name="dataFim"
              rules={[
                {
                  required: true,
                  message: "Por favor preencha a data de fim",
                },
              ]}
            >
              <DatePicker
                placeholder=""
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  setMaxDate(dateString);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Data de inicio preenchimento"
              name="dataPreenchimento"
              extra="Colocar a data de inicio do preenchimento do formulário"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor preencha a data de inicio de preenchimento",
                },
              ]}
            >
              <DatePicker
                placeholder=""
                format="DD/MM/YYYY"
                onChange={(date, dateString) => {
                  setStartDate(dateString);
                }}
              />
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
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
export default App;
