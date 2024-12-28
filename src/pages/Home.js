import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [filteredPosts, setFilteredPosts] = useState([]); // State to store filtered posts

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data); // Initially display all posts
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to filter posts based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filter posts based on the title or body matching the search query
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
    setFilteredPosts(filteredPosts.filter((post) => post.id !== id)); // Remove deleted post from filtered list
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="site-title">Technology News</h1>
        <p className="subheading">Stay updated with the latest trends in tech!</p>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />

        <Link to="/create" className="create-post-link">
          <button className="create-post-button">Create New Post</button>
        </Link>
      </header>

      <div className="blog-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="blog-item">
              <div className="blog-image">
                <img
                  src={post.image} // Dynamic Image URL
                  alt={post.title}
                  className="blog-img"
                />
              </div>
              <div className="blog-info">
                <p className="blog-date">{post.date}</p> {/* Dynamic Date */}
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-body">{post.body.substring(0, 100)}...</p>
              </div>
              <div className="blog-actions">
                <Link to={`/post/${post.id}`} className="read-more-link">
                  <button className="read-more-button">Read More</button>
                </Link>
                <Link to={`/edit/${post.id}`} className="edit-link">
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
