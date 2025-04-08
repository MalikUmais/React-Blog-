import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiPencilAlt } from "react-icons/hi";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    service
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setLoading(false);
      });
  }, []);

  // Hero section for the home page
  const Hero = () => (
    // <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 py-16 md:py-20">
    //   <div className="absolute inset-0">
    //     <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    //     <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
    //   </div>
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 py-16 md:py-20">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] animate-float"></div>
      </div>
      <Container>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-indigo-200">BlogApp</span>
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          {authStatus ? (
            <Link to="/add-post">
              <button className="inline-flex items-center bg-white text-indigo-600 py-3 px-6 rounded-full font-medium hover:bg-indigo-50 transition-colors shadow-lg">
                <HiPencilAlt className="mr-2" />
                Write a story
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="inline-flex items-center bg-white text-indigo-600 py-3 px-6 rounded-full font-medium hover:bg-indigo-50 transition-colors shadow-lg">
                Get started
              </button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );

  // Content for when no posts or user is not authenticated
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
        <HiPencilAlt className="h-8 w-8 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        {authStatus
          ? "Be the first to share your thoughts with our community."
          : "Sign in to read and create amazing blog posts."}
      </p>
      {authStatus ? (
        <Link
          to="/add-post"
          className="inline-flex items-center bg-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-700 transition-colors"
        >
          <HiPencilAlt className="mr-2" />
          Create your first post
        </Link>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center bg-indigo-600 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-700 transition-colors"
        >
          Sign in to continue
        </Link>
      )}
    </div>
  );

  return (
    <div className="pb-16">
      <Hero />

      <div className="py-12">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl bg-white shadow-md h-72"
                >
                  <div className="h-48 w-full bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest Posts
                </h2>
                {authStatus && (
                  <Link
                    to="/all-posts"
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    View all posts
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.$id}>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home;
