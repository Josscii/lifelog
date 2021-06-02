import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import { ProvideAuth } from "./useAuth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
