import React from "react";

function LogList() {
  return (
    <div>
      <div className="my-10 flex flex-col items-center">
        <p className="text-5xl font-light">人生日志</p>
        <p className="text-5xl font-extralight">LIFELOG</p>
      </div>
      <div className="flex justify-center h-14">
        <div className="flex justify-center items-center w-24 border border-black">
          <select className="outline-none">
            <option>日常</option>
            <option>警告</option>
            <option>错误</option>
          </select>
        </div>
        <input
          className="border-black border-t border-r border-b outline-none pl-1"
          value="123"
        />
      </div>
    </div>
  );
}

export default LogList;
