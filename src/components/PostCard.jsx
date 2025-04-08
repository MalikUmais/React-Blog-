import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import { formatDistanceToNow } from "date-fns";

function PostCard({ $id, title, featuredImage, $createdAt, content }) {
  const getImageUrl = (imageId) => {
    try {
      if (!imageId) return null;
      return service.getFileView(imageId);
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  // Create a brief excerpt from the content
  const createExcerpt = (htmlContent) => {
    // Strip HTML tags
    const textOnly = htmlContent ? htmlContent.replace(/<[^>]+>/g, "") : "";
    // Return first 120 characters
    return textOnly.length > 120
      ? `${textOnly.substring(0, 120)}...`
      : textOnly;
  };

  // Format the date
  const formattedDate = $createdAt
    ? formatDistanceToNow(new Date($createdAt), { addSuffix: true })
    : "Recently";

  return (
    // <Link to={`/post/${$id}`} className="group">
    //   <article className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    //     <div className="relative">
    //       {featuredImage ? (
    //         <img
    //           src={getImageUrl(featuredImage)}
    //           alt={title}
    //           className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
    //           onError={(e) => {
    //             if (!e.target.dataset.fallbackUsed) {
    //               e.target.src =
    //                 "https://dummyimage.com/300x200/f3f4f6/6366f1&text=BlogApp";
    //               e.target.dataset.fallbackUsed = "true";
    //             }
    //           }}
    //         />
    //       ) : (
    //         <div className="h-48 w-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
    //           <span className="text-indigo-400 text-lg font-medium">
    //             No Image
    //           </span>
    //         </div>
    //       )}
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {featuredImage ? (
            <img
              src={getImageUrl(featuredImage)}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                if (!e.target.dataset.fallbackUsed) {
                  e.target.src =
                    "https://dummyimage.com/600x400/f3f4f6/6366f1&text=BlogApp";
                  e.target.dataset.fallbackUsed = "true";
                }
              }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
              <span className="text-indigo-400 text-lg font-medium">
                No Image
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="text-lg font-bold text-white">
              {title || "Untitled Post"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
          {content && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
              {createExcerpt(content)}
            </p>
          )}
          <div className="mt-auto">
            <span className="inline-flex items-center justify-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              Read more
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
