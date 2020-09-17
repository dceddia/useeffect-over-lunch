import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Reddit = ({ subreddit }) => {
  const [posts, setPosts] = useState([]);

  console.log('before useEffect');
  useEffect(() => {
    console.log('inside useEffect');
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data received');
        const newPosts = data.data.children.map((child) => {
          return child.data;
        });
        setPosts(newPosts);
      });
  }, [subreddit]);
  console.log('after useEffect');

  return (
    <div>
      <h1>Welcome to {subreddit}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
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
