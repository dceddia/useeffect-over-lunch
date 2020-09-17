import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function useFetch(url, initialState) {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('inside useEffect');
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('data received');
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}

const Reddit = ({ subreddit }) => {
  console.log('before useEffect');
  const { data, error, loading } = useFetch(
    `https://www.reddit.com/r/${subreddit}.json`,
    []
  );
  console.log('after useEffect');
  const posts =
    data?.data?.children?.map((child) => {
      return child.data;
    }) ?? [];

  return (
    <div>
      <h1>Welcome to {subreddit}</h1>
      {error && <div>{error.message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

function App() {
  const inputRef = useRef();
  const [subreddit, setSubreddit] = useState('reactjs');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('changed subreddit to', inputRef.current.value);
    setSubreddit(inputRef.current.value);
  };

  console.log('[App] render');
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subreddit <input ref={inputRef} />
        </label>
      </form>
      <Reddit subreddit={subreddit} />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
