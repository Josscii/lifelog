import React, { useEffect, useState } from "react";
import Log from "./Log";
import { useAuth } from "./useAuth";

function LogList(props) {
  const auth = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (auth.user) {
      const login = auth.user.login;
      fetch(`/api/repos/${login}/lifelog-${login}/issues?per_page=100`, {
        headers: {
          Accept: `application/vnd.github.v3+json`,
        },
      })
        .then((response) => response.json())
        .then((data) => setList(data))
        .catch((error) => console.log(error));
    }
  }, []);

  if (props.newIssue) {
    list.unshift(props.newIssue);
  }

  return (
    <div>
      <ul className="pt-5">
        {list.map((issue) => (
          <li key={issue.id}>
            <Log issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogList;
