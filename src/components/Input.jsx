import React,{ useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {/* <input
        type={type}
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-white text-gray-900
          border border-gray-200
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-colors duration-200
          ${
            type === "file"
              ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              : ""
          }
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      /> */}
      <input
        type={type}
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-white text-gray-900
          border border-gray-300
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-all duration-200
          ${
            type === "file"
              ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-colors"
              : ""
          }
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
