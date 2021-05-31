import React from "react";
import githubIcon from "./GitHub.png";

function Login() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-7xl">人生日志</p>
        <p className="text-7xl font">LIFELOG</p>
      </div>
      <button className="w-6 h-6 absolute top-2 right-2">
        <img src={githubIcon} alt="login button" />
      </button>
    </div>
  );
}

export default Login;
