import React, { useState } from "react";
import 'antd/dist/antd.css';
import { saveAs } from "file-saver";
import axios from "axios";
import {DatePicker} from 'antd'
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
      saveAs(response.data, "file.xls");
    });
  };
  console.log(minDate);
  return (
    <div>
      <DatePicker onChange={(date, dateString) => {setMinDate(dateString)}} format="DD/MM/YYYY"/>
      <DatePicker onChange={(date, dateString) => {setMaxDate(dateString)}} format="DD/MM/YYYY"/>
      <DatePicker onChange={(date, dateString) => {setStartDate(dateString)}} format="DD/MM/YYYY"/>
      <button onClick={() => onRequest()}>Click</button>
    </div>
  );
};
export default App;
