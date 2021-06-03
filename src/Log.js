import dayjs from "dayjs";
import React from "react";

function Log(props) {
  const createdAt = dayjs(props.issue.created_at).format("MM/DD HH:mm");
  const content = props.issue.body;

  return (
    <div className="flex items-start">
      <p className="text-right w-24 flex-shrink-0">{createdAt}</p>
      <p className="pl-2">{content}</p>
    </div>
  );
}

export default Log;
