// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import service from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//   const [post, setPost] = useState(null);
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);

//   const isAuthor = post && userData ? post.userId === userData.$id : false;

//   useEffect(() => {
//     if (slug) {
//       service.getPost(slug).then((post) => {
//         if (post) setPost(post);
//         else navigate("/");
//       });
//     } else navigate("/");
//   }, [slug, navigate]);

//   const deletePost = () => {
//     service.deletePost(post.$id).then((status) => {
//       if (status) {
//         service.deleteFile(post.featuredImage);
//         navigate("/");
//       }
//     });
//   };

//   return post ? (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//           <img
//             src={service.getFilePreview(post.featuredImage)}
//             alt={post.title}
//             className="rounded-xl"
//           />

//           {isAuthor && (
//             <div className="absolute right-6 top-6">
//               <Link to={`/edit-post/${post.$id}`}>
//                 <Button bgColor="bg-green-500" className="mr-3">
//                   Edit
//                 </Button>
//               </Link>
//               <Button bgColor="bg-red-500" onClick={deletePost}>
//                 Delete
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold">{post.title}</h1>
//         </div>
//         <div className="browser-css">{parse(post.content)}</div>
//       </Container>
//     </div>
//   ) : null;
// }
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await service.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      if (post?.$id) {
        const status = await service.deletePost(post.$id);
        if (status) {
          if (post.featuredImage) {
            await service.deleteFile(post.featuredImage);
          }
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center">
            <p>Loading...</p>
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

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {post.featuredImage && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-[600px] object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
              }}
            />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {post.content ? parse(post.content) : "No content available"}
        </div>
      </Container>
    </div>
  ) : null;
}