import React, { useState } from "react";
import LogEditor from "./LogEditor";
import LogList from "./LogList";
import { useAuth } from "./useAuth";

function Home(props) {
  const [newIssue, setNewIssue] = useState(null);
  const auth = useAuth();

  const logSuccess = (data) => {
    setNewIssue(data);
  };

  return (
    <div>
      <span className="absolute top-2 right-2">{auth.user.login}</span>
      <div className="py-10 flex flex-col items-center">
        <p className="text-5xl font-extralight">人生日志</p>
        <p className="text-5xl font-extralight">LIFELOG</p>
      </div>
      <div className="max-w-screen-sm mx-2 sm:mx-auto">
        <LogEditor logSuccess={logSuccess} />
        <LogList newIssue={newIssue} />
      </div>
    </div>
  );
}

export default Home;
