import React, {useState, useEffect} from 'react'



/*
  Below code is not the actual code but just an example of retrieving data from backend & sending data to backend api in react.
*/
function App() {
  const [data, setBackendData] = useState([{}]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000');
        const jsonData = await response.json();
        console.log(jsonData);
        setBackendData(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);

  return (
    <>
    <div>
      <h1>Welcome to Rasoi!</h1>

      {/* Retrieving data */}
      <p>{JSON.stringify(data)}</p>

      {/* Sending data using form with post method */}
      <form method='post' action='http://localhost:3000/signup'>
        Email: <input type='email' name='email' required />
        Password:<input name='password' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
    </>
  )
}

export default App;
