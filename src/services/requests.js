import axios from "axios";
const { REACT_APP_PROD_URL } = process.env
const BASE_URL_PRODUCTION = `${REACT_APP_PROD_URL}`;
// const BASE_URL_DEV = "http://127.0.0.1:8080";

const onLogin = ({ name, password }) => {
  let bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("password", password);
  return axios({
    url: `${BASE_URL_PRODUCTION}/login`,
    method: "POST",
    responseType: "json",
    data: bodyFormData,
    headers: {
      "Content-Type": `multipart/form-data;`,
    },
  });
};

const onDownload = (token, obj) => {
    return axios({
      url: `${BASE_URL_PRODUCTION}/pdf/seguro.xls`,
      method: "POST",
      responseType: "blob",
      data: obj,
      headers: {
        "x-access-token": token
      }
    })
  };

  export {onLogin, onDownload}
