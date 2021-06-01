import React, { useContext, createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CLIENT_ID = "f347cec957e100780afc";
const CLIENT_SECRET = "78e82ef5b2ac3bd94b757e1e8eafc872765a8626";
const REDIRECT_URI = "http://localhost:3000/login";

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const requestIdentity = () => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  };

  const login = (code) => {
    const data = new FormData();
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);
    data.append("code", code);
    data.append("redirect_uri", REDIRECT_URI);
    fetch(`/auth/login/oauth/access_token`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((paramsString) => {
        let params = new URLSearchParams(paramsString);
        const access_token = params.get("access_token");

        // Request to return data of a user that has been authenticated
        return fetch(`/api/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return {
    user,
    requestIdentity,
    login,
  };
}

export { ProvideAuth, useAuth };
