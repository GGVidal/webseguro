import React, { useState } from "react";
import { Form, message } from "antd";
import SecureLS from "secure-ls";
import { saveAs } from "file-saver";

import { layout } from "../utils/layouts";
import Login from "./Login";
import GenerateXls from "./GenerateXls";
import { onDownload, onLogin } from "../services/requests";


const FormComponent = () => {
  const [isLogged, setIsLogged] = useState(false);
  let ls = new SecureLS({ encodingType: "aes" });

  const onFinish = (values) => {
    if (!isLogged) {
      onLogin(values)
        .then((res) => {
          ls.set("key", { data: res.data.token });
          setIsLogged(true);
          success();
        })
        .catch((error) => {
          onError(error.response);
        });
      return;
    }
    const { minDate, maxDate, startDate } = values
    const min_date = minDate.format("DD/MM/YYYY");
    const max_date = maxDate.format("DD/MM/YYYY");
    const start_date = startDate.format("DD/MM/YYYY");
    const token = ls.get("key").data;
    const obj = {min_date, max_date, start_date}
    onDownload(token, obj).then((res)=>{
      saveAs(res.data, "seguro.xls")
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const success = () => {
    message.success("Login Aprovado", 2);
  };
  const onError = ({ status }) => {
    if (status === 403) {
      message.error("Credenciais inválidas", 2);
    }
    if (status === 401) {
      message.error("Nome não encontrado");
    }
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {isLogged ? <GenerateXls /> : <Login />}
    </Form>
  );
};

export default FormComponent;
