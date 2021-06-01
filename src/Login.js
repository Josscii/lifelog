import React from "react";
import githubIcon from "./GitHub.png";
import { useAuth } from "./useAuth";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login(props) {
  const auth = useAuth();
  const query = useQuery();

  const code = query.get("code");
  if (code) {
    auth.login(code);
    return <div>登录中...</div>;
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-7xl font-extralight">人生日志</p>
        <p className="text-7xl font-extralight">LIFELOG</p>
      </div>
      <button
        className="w-6 h-6 absolute top-4 right-4"
        onClick={() => {
          auth.requestIdentity();
        }}
      >
        <img src={githubIcon} alt="login button" />
      </button>
    </div>
  );
}

export default Login;
