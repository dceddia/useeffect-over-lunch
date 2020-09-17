import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  console.log('before useEffect');
  useEffect(() => {
    console.log('inside useEffect');
    fetch('https://www.reddit.com/r/reactjs.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('data received');
        const newPosts = data.data.children.map((child) => {
          return child.data;
        });
        setPosts(newPosts);
      });
  }, []);
  console.log('after useEffect');

  return (
    <div>
      <h1>Welcome to Reddit</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
