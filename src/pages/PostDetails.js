import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css"; // Make sure to link the CSS file

const PostDetails = () => {
  const { id } = useParams();  // Get the dynamic id from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [posts1, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the post by ID from the server
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        setPost(response.data);  // Set the fetched post data in state
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching post details! Please try again.");
        setLoading(false);
      });
  }, [id]);  // Rerun the effect whenever the ID changes


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    setPosts(posts1.filter((post) => post.id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-details-container">
      <div className="post-header">
        <h1>{post.title}</h1>
        <p className="post-date">{post.date}</p>
      </div>

      <div className="post-content">
        <img className="post-image" src={post.image} alt={post.title} />
        <p className="post-body">{post.body}</p>
      </div>

      <div className="post-actions">
      <Link to={`/edit/${post.id}`} className="edit-link">
          <button className="edit-button">Edit</button>
      </Link>
      <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default PostDetails;
