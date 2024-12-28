import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPost.css'; // Import the CSS file for styling

const EditPost = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [post, setPost] = useState({
    title: '',
    body: '',
    date: '',
    image: ''
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching post data');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, post);
      navigate(`/post/${id}`); // Redirect to the post details page after saving
    } catch (error) {
      setError('Error saving the post');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-container">
      <h2>Edit Post</h2>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Enter post title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            placeholder="Enter post content"
          />
        </div>

        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={() => navigate(`/post/${id}`)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
