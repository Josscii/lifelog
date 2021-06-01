import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import { ProvideAuth, useAuth } from "./useAuth";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <ProvideAuth>
            <Login />
          </ProvideAuth>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
