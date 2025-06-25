import { useState } from "react";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <MainPage user={user} />
      ) : (
        <AuthPage onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />
      )}
    </div>
  );
}

export default App;
