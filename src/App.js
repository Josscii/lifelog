import Login from "./Login";
import Home from "./Home";
import { ProvideAuth, useAuth } from "./useAuth";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
