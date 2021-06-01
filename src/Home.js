import React from "react";
import LogEditor from "./LogEditor";
import LogList from "./LogList";

function Home() {
  return (
    <div>
      <div className="py-10 flex flex-col items-center">
        <p className="text-5xl font-extralight">人生日志</p>
        <p className="text-5xl font-extralight">LIFELOG</p>
      </div>
      <div className="max-w-screen-sm mx-2 sm:mx-auto">
        <LogEditor />
        <LogList />
      </div>
    </div>
  );
}

export default Home;
