import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [login, setLogin] = useState(false);

  return login ? (
    <Home />
  ) : (
    <Login
      handleLoginClick={() => {
        setLogin(true);
      }}
    />
  );
}

export default App;
