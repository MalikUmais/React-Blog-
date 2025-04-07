// import React from "react";
// import service from "../appwrite/config";
// import { Link } from "react-router-dom";

// function PostCard({ $id, title, featuredImage }) {
//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="w-full bg-gray-100 rounded-xl p-4">
//         <div className="w-full justify-center mb-4">
//           <img
//             src={service.getFilePreview(featuredImage)}
//             alt={title}
//             className="rounded-xl "
//           />
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default PostCard;



import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const getImageUrl = (imageId) => {
    try {
      if (!imageId) return null;
      console.log(imageId);
      console.log (service.getFilePreview(imageId));
      return service.getFilePreview(imageId);
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featuredImage && (
            <img
              src={getImageUrl(featuredImage)}
              alt={title}
              className="rounded-xl w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          )}
        </div>
        <h2 className="text-xl font-bold">{title || "Untitled Post"}</h2>
      </div>
    </Link>
  );
}

export default PostCard;