import dayjs from "dayjs";
import React, { useState } from "react";
import { useAuth } from "./useAuth";

function LogEditor(props) {
  const [level, setLevel] = useState("日常");
  const [text, setText] = useState("");
  const auth = useAuth();

  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.metaKey && auth.user) {
      const login = auth.user.login;
      fetch(`/api/repos/${login}/lifelog-${login}/issues`, {
        method: "POST",
        headers: {
          Accept: `application/vnd.github.v3+json`,
          Authorization: `token ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: dayjs().format(),
          body: text,
          labels: [level],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setText("");
          props.logSuccess(data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex h-14" onKeyDown={handleSubmit}>
      <div className="flex justify-center items-center w-24 border border-black">
        <select
          className="outline-none"
          value={level}
          onChange={(event) => setLevel(event.target.value)}
        >
          <option value="日常">日常</option>
          <option value="警告">警告</option>
          <option value="错误">错误</option>
        </select>
      </div>
      <textarea
        className="border-black border-t border-r border-b outline-none p-3.5 flex-grow resize-none"
        placeholder="✍️试着记录下此刻发生的任何事情"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
}

export default LogEditor;
