import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const clientID = process.env.REACT_APP_ID_CLIENTE;

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    console.log("User: " + user);
  }
  function handleSignOut(e) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
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

      google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      
      { Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>

      }
      { user.name &&
        <div>
          <img src={user.picture} alt="user"/>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
