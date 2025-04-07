// import React, { useState, useEffect } from "react";
// import service from "../appwrite/config";
// import { Container, PostCard } from "../components";
// function AllPosts() {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     service.getPosts([]).then((posts) => {
//       //   setPosts(posts);
//       if (posts) {
//         setPosts(posts.documents);
//       }
//     });
//   }, []);
//   return (
//     <div className="w-full py-8">
//       <Container>
//         {/* {
//             posts.map((post) => {
//                 return <PostCard key={post.$id} post={post} />;
//             })
//         } */}
//         <div className="flex flex-wrap ">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-2 w-1/4">
//               <PostCard post={post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default AllPosts;


import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await service.getPosts([]);
        if (response && response.documents) {
          setPosts(response.documents);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center">
            <p>Loading posts...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center">
              <p>No posts found</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;