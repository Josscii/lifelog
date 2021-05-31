import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [login] = useState(false);
  return login ? <div>人生日志</div> : <Login />;
}

export default App;
