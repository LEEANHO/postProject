import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./post.css";
import amogus from "./assets/amogus.png"; // 이미지 경로 맞게 수정

const Post = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [posts, setPosts] = useState([]);
  const user_id = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitleValue(e.target.value);
  const handleContentChange = (e) => setContentValue(e.target.value);

  const handlePost = async () => {
    try {
      const res = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleValue,
          content: contentValue,
          user_id,
        }),
      });

      if (res.ok) {
        setTitleValue("");
        setContentValue("");
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/post");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      <div className="post-header-row">
        <h2 className="post-title">
          <img
            src={amogus}
            alt="메인으로"
            className="icon-button"
            onClick={() => navigate("/")}
          />
          게시판
        </h2>
      </div>

      <div className="post-row post-header">
        <div className="post-cell title">제목</div>
        <div className="post-cell content">내용</div>
        <div className="post-cell author">작성자</div>
      </div>

      {posts.map((p, i) => (
        <div key={i} className="post-row">
          <div className="post-cell title">{p.title}</div>
          <div className="post-cell content">{p.content}</div>
          <div className="post-cell author">{p.user_id}</div>
        </div>
      ))}

      <div className="post-input-row">
        <input
          value={titleValue}
          onChange={handleTitleChange}
          placeholder="제목"
          className="post-input title"
        />
        <input
          value={contentValue}
          onChange={handleContentChange}
          placeholder="내용"
          className="post-input content"
        />
        <button onClick={handlePost}>등록</button>
      </div>
    </div>
  );
};

export default Post;
