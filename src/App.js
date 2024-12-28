import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home />} />

        {/* Route for viewing individual post */}
        <Route path="/post/:id" element={<PostDetails />} />

        {/* Route for creating a new post */}
        <Route path="/create" element={<CreatePost />} />

        {/* Route for editing an existing post */}
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
