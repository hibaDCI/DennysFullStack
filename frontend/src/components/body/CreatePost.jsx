import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
// import axios from "../utils/axiosConfig"; //  later when config for deployment

function CreatePost() {
  const [post, setPost] = useState([]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      desc: formData.get("desc"),
    };

    const result = await axios.post("/api/posts/create", data);
    console.log(result);
    setPost(result.data.newPost);
  };

  return (
    <div className="container-login">
      <h3 className="heading">Create Post</h3>
      <form
        className="login-form"
        action=""
        method="post"
        onSubmit={handlerSubmit}
      >
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control "
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="desc"
            placeholder="description"
            className="form-control"
          />
        </div>

        <button className="button-login" type="submit">
          add post
        </button>
      </form>
      <div className="card">
        {post && (
          <div className="card-body">
            <h3 className="card-title">{post.desc}</h3>
            <p>{post.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
