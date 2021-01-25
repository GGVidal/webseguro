import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { saveAs } from "file-saver";
import axios from "axios";
import { layout } from "./utils/layouts"
import Login from './components/Login'
import GenerateXls from './components/GenerateXls'
import {
  Layout,
  Form,
  Typography,
  Row,
  message
} from "antd";
import SecureLS from "secure-ls";

const { Header, Content } = Layout;
const { Title } = Typography;
const BASE_URL_PRODUCTION = "http://52.15.176.199:8080"
const BASE_URL_DEV = "http://127.0.0.1:8080"
const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  let ls = new SecureLS({ encodingType: "aes" });
  const handleShowFields = () => {
    if (!isLogged) {
      return (
        <Login />
      );
    }
    return (
      <GenerateXls />
    );
  };

  const onFinish = (values) => {
    if (!isLogged) {
      onLogin(values);
      return
    }
    onRequest(values)
  };

  const onLogin = ({ name, password }) => {
    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("password", password);
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
        setIsLogged(true)
        success()
      })
      .catch((error) => {
        onError(error.response)
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const success = () => {
    message.success('Login Aprovado', 2);
  };
  const onError = ({status}) => {
    if (status === 403) {
      message.error('Credenciais inválidas', 2)
    }
    if (status === 401) {
      message.error('Nome não encontrado')
    }
  }
  const onRequest = ({minDate, maxDate, startDate}) => {
    const min_date = minDate.format('DD/MM/YYYY');
    const max_date = maxDate.format('DD/MM/YYYY');
    const start_date = startDate.format('DD/MM/YYYY');
    const token = ls.get('key').data
    axios({
      url: `${BASE_URL_PRODUCTION}/pdf/seguro.xls`,
      method: "POST",
      responseType: "blob",
      data: { min_date, max_date, start_date },
      headers: {
        "x-access-token": token
      }
    }).then((response) => {
      saveAs(response.data, "seguro.xls");
    });
  };
  // useEffect(() => {
  //   const token = ls.get('key').data
  //   if (token) {
  //     setIsLogged(true)
  //     return
  //   }

  //   window.addEventListener('beforeunload', () => {
  //     setIsLogged(false)
  //     ls.removeAll()
  //     return 
  //   })
  // }, [])
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
          <Row align="center" style={{marginBottom: "8em"}}>
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
