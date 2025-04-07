import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const getImageUrl = (imageId) => {
    try {
      if (!imageId) return null;
      console.log(imageId);
      return service.getFileView(imageId);
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
                const fallback =
                  "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
                if (!e.target.dataset.fallbackUsed) {
                  e.target.src = fallback;
                  e.target.dataset.fallbackUsed = "true";
                }
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
