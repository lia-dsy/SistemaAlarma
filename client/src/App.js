import { useEffect } from 'react';

const clientID = process.env.REACT_APP_ID_CLIENTE;

function App() {

  function handleCallbackResponse(response) {
    console.log("ID token: " + response.credential);
  }

  useEffect(() => {
    /* global google */
      google.accounts.id.initialize({
        client_id: clientID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
