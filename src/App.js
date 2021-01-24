import React, { useState } from "react";
import "antd/dist/antd.css";
import { saveAs } from "file-saver";
import axios from "axios";
import {
  DatePicker,
  Layout,
  Button,
  Form,
  Typography,
  Row,
  Input,
  message
} from "antd";
import SecureLS from "secure-ls";

const { Header, Content } = Layout;
const { Title } = Typography;
const BASE_URL_PRODUCTION = "http://52.15.176.199:8080"
const BASE_URL_DEV = "http://127.0.0.1:8080"
const App = () => {
  const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 16 },
  };
  const [isLogged, setIsLogged] = useState(false);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [startDate, setStartDate] = useState(0);

  const tailLayout = {
    wrapperCol: { offset: 11, span: 16 },
  };
  let ls = new SecureLS({ encodingType: "aes" });
  const handleShowFields = () => {
    if (!isLogged) {
      return (
        <>
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ width: "13em" }} />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
    }
    return (
      <>
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
              message: "Por favor preencha a data de inicio de preenchimento",
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
      </>
    );
  };

  const onFinish = (values) => {
    console.log("GABRIEL VALUES", values);
    if (!isLogged) {
      onLogin(values);
      return
    }
    onRequest()
    // onRequest().then();
  };

  const onLogin = ({ name, password }) => {
    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("password", password);
    console.log(bodyFormData);
    axios({
      url: `${BASE_URL_PRODUCTION}/login`,
      method: "POST",
      responseType: "json",
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((response) => {
        ls.set("key", { data: response.data.token });
        console.log(response.data.token)
        setIsLogged(true)
        success()
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const success = () => {
    message.success('Login Aprovado', 2);
  };
  const onRequest = () => {
    const token = ls.get('key').data
    axios({
      url: `${BASE_URL_PRODUCTION}/pdf/seguro.xls`,
      method: "POST",
      responseType: "blob",
      data: { min_date: minDate, max_date: maxDate, start_date: startDate },
      headers: {
        "x-access-token": token
      }
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
            {handleShowFields}
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
export default App;
