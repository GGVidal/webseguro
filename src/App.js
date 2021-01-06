import React, { useState } from "react";
import "antd/dist/antd.css";
import { saveAs } from "file-saver";
import axios from "axios";
import { DatePicker, Layout, Button, Row, Col } from "antd";
const { Header, Content } = Layout;

const App = () => {
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const onRequest = async () => {
    axios({
      url: "http://127.0.0.1:5000/pdf/seguro.xls",
      method: "POST",
      responseType: "blob",
      data: { min_date: minDate, max_date: maxDate, start_date: startDate }, // important
    }).then((response) => {
      saveAs(response.data, "seguro.xls");
    });
  };

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%", backgroundColor: '#388E3C' }}>
        <div className="logo" />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 84 }}
      >
        <div className="site-layout-background" style={{ minHeight: "42em" }}>
          <Row align="center" gutter={12}>
            <Col>
              <DatePicker
                onChange={(date, dateString) => {
                  setMinDate(dateString);
                }}
                format="DD/MM/YYYY"
              />
            </Col>
            <Col>
              <DatePicker
                onChange={(date, dateString) => {
                  setMaxDate(dateString);
                }}
                format="DD/MM/YYYY"
              />
            </Col>
            <Col>
              <DatePicker
                onChange={(date, dateString) => {
                  setStartDate(dateString);
                }}
                format="DD/MM/YYYY"
              />
            </Col>
            <Button style={{backgroundColor: '#8BC34A'}} shape="round" onClick={() => onRequest()}>Gerar</Button>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
export default App;
