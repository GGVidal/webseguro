import React from "react";
import "antd/dist/antd.css";
import { Layout, Typography, Row } from "antd";
import Form from "./components/Form";

const { Header, Content } = Layout;
const { Title } = Typography;
const App = () => {
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
        <div className="site-layout-background" style={{ minHeight: "48em" }}>
          <Row align="center" style={{ marginBottom: "8em" }}>
            <Title>Seguro Ítaca</Title>
          </Row>
          <Form />
        </div>
      </Content>
    </Layout>
  );
};
export default App;
