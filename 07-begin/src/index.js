import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function ViewCounter() {
  const [viewCount, setViewCount] = useLocalStorage(
    "viewCountKey",
    0
  );

  useEffect(() => {
    setViewCount((count) => count + 1);
  }, []);

  return <div>Total views: {viewCount}</div>;
}

ReactDOM.render(
  <ViewCounter />,
  document.querySelector("#root")
);
