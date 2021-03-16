import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Pagination from "./components/Pagination"
import './App.css';
import axios from 'axios';
import Posts from './components/Posts'
import pagination from './components/pagination';
function App() {
  const [posts, setPosts] = userState([]);
  const [loading, setLoading] = userState(false);
  const [currentPage, setCurrentPage] = userState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);

    }
    fetchPost();
  }, []);
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  //chage page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  console.log(posts)
  return (
    <div className="container mt-5">
      <h1 className="text-promary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.lenght} paginate={paginate} />
    </div>
  );
}

export default App;
