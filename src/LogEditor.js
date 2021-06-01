import React from "react";

function LogEditor() {
  return (
    <div className="flex h-14">
      <div className="flex justify-center items-center w-24 border border-black">
        <select className="outline-none">
          <option>日常</option>
          <option>警告</option>
          <option>错误</option>
        </select>
      </div>
      <textarea
        className="border-black border-t border-r border-b outline-none p-3.5 flex-grow resize-none"
        placeholder="✍️试着写下你的第一条日志"
      />
    </div>
  );
}

export default LogEditor;
