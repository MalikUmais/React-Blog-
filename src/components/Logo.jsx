

import React from "react";

function Logo({ width = "100px", colorClass = "text-indigo-600" }) {
  return (
    <div
      className={`font-bold text-xl ${colorClass} tracking-tight flex items-center`}
      style={{ width }}
    >
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded text-white mr-1.5">
        B
      </span>
      <span>BlogApp</span>
    </div>
  );
}

export default Logo;
