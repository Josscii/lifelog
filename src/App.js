import { useState } from "react";
import "./App.css";
import Login from "./Login";
import LogList from "./LogList";

function App() {
  const [login] = useState(true);
  return login ? <LogList /> : <Login />;
}

export default App;
