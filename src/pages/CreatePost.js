import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file for styling

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(""); // New state for image URL
  const navigate = useNavigate();

  // Function to get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // "2024-12-23"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Post data to db.json, including title, body, image, and generated date
    await axios.post("http://localhost:5000/posts", {
      title,
      body,
      image,
      date: getCurrentDate(),
    });

    navigate("/"); // Redirect to home page after posting
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Enter post content"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="Enter image URL"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
