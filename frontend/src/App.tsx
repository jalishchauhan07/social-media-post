import React, { useState, useEffect } from "react";
import style from "./App.module.css";
import proxy from "./proxy";
import Login from "./login/Login";

function App() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [successfulPosts, setSuccessfulPosts] = useState(0);
  const [failedPosts, setFailedPosts] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  const [postCountInDb, setPostCountInDb] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchPostCount();
    }
  }, []);

  const fetchPostCount = async () => {
    const response = await fetch(`${proxy}/post/count`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    setPostCountInDb(data.count);
  };

  const resetState = () => {
    setTotalPosts(0);
    setSuccessfulPosts(0);
    setFailedPosts(0);
    setQueueSize(0);
  };

  const createPost = async () => {
    setQueueSize(queueSize + 1);
    setTotalPosts(totalPosts + 1);
    try {
      const response = await fetch(`${proxy}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: "P",
          message: "DEMO",
          context: "fdfd",
          tags: "#funday",
          externalLinks: "",
          location: "ahmedabad",
          images:
            "data:image/jpeg;base64,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",
          numLikes: 0,
          numBookmarks: 0,
          numViews: 0,
        }),
      });
      if (response.ok) {
        setSuccessfulPosts(successfulPosts + 1);
        fetchPostCount();
      } else {
        setFailedPosts(failedPosts + 1);
      }
    } catch (error) {
      setFailedPosts(failedPosts + 1);
    } finally {
      setQueueSize(queueSize - 1);
    }
  };

  const searchPosts = async () => {
    const response = await fetch(`${proxy}/posts?q=${searchQuery}`);
    const data = await response.json();
    setPosts(data);
  };

  return localStorage.getItem("token") == undefined ? (
    <Login />
  ) : (
    <div className={style.container}>
      <h1>Post Manager</h1>
      <button onClick={resetState}>Reset State</button>
      <div>
        <strong>Total Posts Attempted:</strong> {totalPosts}
      </div>
      <div>
        <strong>Successful Posts:</strong> {successfulPosts}
      </div>
      <div>
        <strong>Failed Posts:</strong> {failedPosts}
      </div>
      <div>
        <strong>Queue Size:</strong> {queueSize}
      </div>
      <div>
        <strong>Posts in Database:</strong> {postCountInDb}
      </div>
      <button onClick={createPost}>Create Post</button>
      <div>
        <input
          className={style.postInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Posts"
        />
        <button onClick={searchPosts}>Search</button>
      </div>
      <ul>
        {posts.map((post: any, index: any) => (
          <li key={index}>{post && post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
