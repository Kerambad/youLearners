import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [testMessage, setTestMessage] = useState("")

  useEffect(() => {
    fetchTestMessage();
  }, [])

  const fetchTestMessage = () => {
    axios.get("/api/test")
      .then((response) => response.data)
      .then((data) => setTestMessage(data))
      .catch((error) => console.log(error))
  }
  return (

    <div className="App">
      <h1>{testMessage}</h1>
    </div>
  );
}

export default App;
