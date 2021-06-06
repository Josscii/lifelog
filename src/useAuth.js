import React, { useContext, createContext } from "react";
import useLocalStorage from "./useLocalStorage";

const CLIENT_ID = "f347cec957e100780afc";
const CLIENT_SECRET = "78e82ef5b2ac3bd94b757e1e8eafc872765a8626";
const REDIRECT_URI = "http://localhost:4200/login";

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [accessToken, setAccessToken] = useLocalStorage("access_token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [repo, setRepo] = useLocalStorage("repo", null);

  const requestIdentity = () => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=repo,user&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  };

  const login = (code, completion) => {
    let localAccessToken = null;
    let localUser = null;

    fetch("/auth/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })
      .then((response) => response.text())
      .then((paramsString) => {
        const params = new URLSearchParams(paramsString);
        const access_token = params.get("access_token");

        if (access_token == null) {
          throw new Error("fetch access_token failed");
        }

        setAccessToken(access_token);

        localAccessToken = access_token;

        return fetch(`/api/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        localUser = data;

        return fetch(`/api/repos/${data.login}/lifelog-${data.login}`, {
          headers: {
            Accept: `application/vnd.github.v3+json`,
          },
        });
      })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setRepo(data);
            completion(true);
          });
          return;
        }

        return fetch(`/api/user/repos`, {
          method: "POST",
          headers: {
            Accept: `application/vnd.github.v3+json`,
            Authorization: `token ${localAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `lifelog-${localUser.login}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setRepo(data);
            completion(true);
          });
      })
      .catch((error) => {
        console.log(error);
        completion(false);
      });
  };

  return {
    accessToken,
    user,
    repo,
    requestIdentity,
    login,
  };
}

export { ProvideAuth, useAuth };
