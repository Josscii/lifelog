import React, { useEffect, useState } from "react";
import Log from "./Log";
import { useAuth } from "./useAuth";

function LogList(props) {
  const auth = useAuth();
  const [list, setList] = useState([]);
  const [preIssue, setPreIssue] = useState(null);
  const [newIssueCount, setNewIssueCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (auth.user) {
      const login = auth.user.login;
      fetch(
        `/api/repos/${login}/lifelog-${login}/issues?per_page=30&page=${page}`,
        {
          headers: {
            Accept: `application/vnd.github.v3+json`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data.splice(0, newIssueCount);
          setList([...list, ...data]);
        })
        .catch((error) => console.log(error));
    }
  }, [page]);

  if (props.newIssue && props.newIssue !== preIssue) {
    setList([props.newIssue, ...list]);
    setPreIssue(props.newIssue);
    setNewIssueCount(newIssueCount + 1);
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
      {list.length >= 30 &&
        list.length < auth.repo.open_issues_count + newIssueCount && (
          <button className="block mx-auto" onClick={() => setPage(page + 1)}>
            加载更多
          </button>
        )}
    </div>
  );
}

export default LogList;
