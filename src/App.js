import React, { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
const App = () => {
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const onRequest = async () => {
    axios({
      url: "http://127.0.0.1:5000/pdf/seguro.xls",
      method: "POST",
      responseType: "blob",
      data: { min_date: minDate, max_date: maxDate }, // important
    }).then((response) => {
      saveAs(response.data, "file.xls");
    }); 
  };
  return (
    <div>
      <input onChange={(e) => setMinDate(e.target.value)} />
      <input onChange={(e) => setMaxDate(e.target.value)} />
      <button onClick={() => onRequest()}>Click</button>
    </div>
  );
};
export default App;
