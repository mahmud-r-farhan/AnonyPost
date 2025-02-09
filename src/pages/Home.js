import { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import SEO from "../components/SEO";
import RightSidebar from "../components/RightSidebar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? new Date(post.createdAt) >= dateFilter : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SEO 
        image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117754/image-wtRQg0aGJkPVZemCd-o5s_nc7njv.webp"
        description="Browse anonymous posts and share your thoughts freely." 
      />
      <PostForm onNewPost={handleNewPost} />
      <PostList posts={filteredPosts} />
      <RightSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
    </div>
  );
}

export default Home;