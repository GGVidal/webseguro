import React, {useState} from 'react';
import axios from 'axios';
const App = () => {
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const onRequest = async() => {
    axios({
      url: `http://localhost:5000/pdf/seguro.xls?min_date=${minDate}&max_date=${maxDate}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.xls'); //or any other extension
       document.body.appendChild(link);
       link.click();
    }).catch(error => {console.log(error)});
  }
  return(
    <div>
      <input onChange={(e)=> setMinDate(e.target.value)}/>
      <input onChange={(e)=> setMaxDate(e.target.value)}/>
      <button onClick={() => onRequest()}>Click</button>
    </div>
  )
}
export default App;
