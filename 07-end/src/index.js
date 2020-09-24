import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import "./index.css";

function useLocalStorage(key, defaultValue) {
  let initialValue = defaultValue;
  try {
    initialValue = JSON.parse(localStorage.getItem(key));
  } catch (e) {}

  const [value, setValue] = useState(initialValue);

  const setLocalStorage = useCallback(
    (valueOrFn) => {
      setValue((prevValue) => {
        let newValue = valueOrFn;
        if (typeof valueOrFn === "function") {
          newValue = valueOrFn(prevValue);
        }
        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    },
    [key]
  );

  return [value, setLocalStorage];
}

function ViewCounter() {
  const [viewCount, setViewCount] = useLocalStorage(
    "viewCountKey",
    0
  );

  useEffect(() => {
    setViewCount((count) => count + 1);
  }, [setViewCount]);

  return <div>Total views: {viewCount}</div>;
}

ReactDOM.render(
  <ViewCounter />,
  document.querySelector("#root")
);
